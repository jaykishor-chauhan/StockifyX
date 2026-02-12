import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, RotateCcw, FileText, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ipoPipelineData } from '@/data/ipoPipelineData';

type SortField = 'symbol' | 'name' | 'sector' | 'units' | 'price' | 'amounts' | 'openingDate' | 'closingDate' | 'status' | 'applicationDate' | 'sebonDate' | 'issueManager';
type SortDir = 'asc' | 'desc';

const categoryOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'IPO', label: 'IPO' },
  { value: 'IPO Local', label: 'IPO Local' },
  { value: 'IPO Foreign Employment', label: 'IPO Foreign Emplo...' },
  { value: 'Right Share', label: 'Right Share' },
  { value: 'FPO', label: 'FPO' },
  { value: 'Mutual Funds', label: 'Mutual Funds' },
  { value: 'Debentures', label: 'Debentures' },
];

const itemsPerPageOptions = ['10', '20', '50'];

export default function IPOPipelinePage() {
  const [category, setCategory] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const filtered = useMemo(() => {
    let data = ipoPipelineData;
    if (category !== 'all') {
      data = data.filter(d => d.category === category);
    }
    data = [...data].sort((a, b) => {
      const aVal = a[sortField] ?? '';
      const bVal = b[sortField] ?? '';
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return data;
  }, [category, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleReset = () => {
    setCategory('all');
    setCurrentPage(1);
    setSortField('symbol');
    setSortDir('asc');
  };

  // Determine columns based on category
  const showPipelineColumns = ['all', 'IPO', 'Mutual Funds', 'Debentures', 'FPO'].includes(category);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge className="bg-success/15 text-success border-success/20 hover:bg-success/20">Open</Badge>;
      case 'ComingSoon':
        return <Badge className="bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">ComingSoon</Badge>;
      case 'Closed':
        return <Badge className="bg-destructive/15 text-destructive border-destructive/20 hover:bg-destructive/20">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={cn("w-3 h-3", sortField === field && "text-primary")} />
      </div>
    </th>
  );

  return (
    <div className="section-padding py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-lg border border-border bg-card">
            <span className="font-semibold text-sm">
              {category === 'all' ? 'Upcoming / Existing Issues' : 'Ipo Pipeline'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Items Per Page</span>
            <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
              <SelectTrigger className="w-20 h-9 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {itemsPerPageOptions.map(o => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Category Dropdown Filter */}
      <div>
        <Select value={category} onValueChange={(v) => { setCategory(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-64 h-10 bg-card">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {categoryOptions.map(o => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <SortHeader field="symbol" label="Symbol" />
                  <SortHeader field="name" label="Company" />
                  {showPipelineColumns ? (
                    <>
                      <SortHeader field="sector" label="Sector" />
                      <SortHeader field="units" label="Units" />
                      <SortHeader field="amounts" label="Amounts" />
                      <SortHeader field="openingDate" label="Application Date" />
                      <SortHeader field="closingDate" label="Date of SEBON" />
                      <SortHeader field="issueManager" label="Issue Manager" />
                    </>
                  ) : (
                    <>
                      <SortHeader field="units" label="Units" />
                      <SortHeader field="price" label="Price" />
                      <SortHeader field="openingDate" label="Opening Date" />
                      <SortHeader field="closingDate" label="Closing Date" />
                      <SortHeader field="status" label="Status" />
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">View</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((item, i) => (
                  <tr key={item.symbol + '-' + i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {item.symbol[0]}
                        </div>
                        <span className="text-sm font-medium text-primary">{item.symbol}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm max-w-[200px] truncate">{item.name}</td>
                    {showPipelineColumns ? (
                      <>
                        <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[120px]">{item.sector || 'Unknown'}</td>
                        <td className="px-4 py-3 text-sm tabular-nums">{(item.units || 0).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm tabular-nums">{(item.amounts || 0).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm">{item.applicationDate || '-'}</td>
                        <td className="px-4 py-3 text-sm">{item.sebonDate || '-'}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground truncate max-w-[120px]">{item.issueManager || '-'}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-sm tabular-nums">{(item.units || 0).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm tabular-nums">{item.price || 100}</td>
                        <td className="px-4 py-3 text-sm">{item.openingDate || '-'}</td>
                        <td className="px-4 py-3 text-sm">{item.closingDate || '-'}</td>
                        <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                        <td className="px-4 py-3">
                          <FileText className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                      No data found for this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={cn(
                    "w-8 h-8 rounded text-sm font-medium transition-colors",
                    currentPage === p ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
              {totalPages > 4 && <span className="text-muted-foreground">...</span>}
              {totalPages > 3 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={cn(
                    "w-8 h-8 rounded text-sm font-medium transition-colors",
                    currentPage === totalPages ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
