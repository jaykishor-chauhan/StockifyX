import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, RotateCcw, Search, ArrowUpDown, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { bulkTransactionsMock } from '@/data/bulkTransactionsData';
import { Progress } from '@/components/ui/progress';

type SortField = 'symbol' | 'type' | 'openPrice' | 'closePrice' | 'avgPrice' | 'changePercent' | 'quantity' | 'amount' | 'trade' | 'brokerId' | 'lastTransactionTime';
type SortDir = 'asc' | 'desc';

export default function BulkTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedDate] = useState('2026-02-05');

  const filtered = useMemo(() => {
    let data = bulkTransactionsMock;
    if (searchQuery) {
      data = data.filter(d =>
        d.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
  }, [searchQuery, sortField, sortDir]);

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

  // Calculate summary
  const buyItems = bulkTransactionsMock.filter(t => t.type === 'Buy');
  const sellItems = bulkTransactionsMock.filter(t => t.type === 'Sell');
  const totalBuyQty = buyItems.reduce((s, t) => s + t.quantity, 0);
  const totalSellQty = sellItems.reduce((s, t) => s + t.quantity, 0);
  const totalBuyAmt = buyItems.reduce((s, t) => s + t.amount, 0);
  const totalSellAmt = sellItems.reduce((s, t) => s + t.amount, 0);
  const totalQty = totalBuyQty + totalSellQty;
  const buyPercent = totalQty > 0 ? (totalBuyQty / totalQty * 100) : 50;

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
    setSortField('symbol');
    setSortDir('asc');
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none whitespace-nowrap"
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
        <div className="px-4 py-2 rounded-lg border border-border bg-card">
          <span className="font-semibold text-sm">Bulk Mkt Transactions</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <Calendar className="w-4 h-4" />
            {selectedDate}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Stocks"
              className="pl-9 w-48 h-9 bg-card"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{selectedDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Items Per Page</span>
          <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
            <SelectTrigger className="w-20 h-9 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {['10', '20', '50'].map(o => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-sm">Buy Qty: <strong>{totalBuyQty.toLocaleString('en-IN')}</strong> ({buyPercent.toFixed(1)}%)</span>
            <span className="text-sm text-muted-foreground">Rs. {totalBuyAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="text-sm">Sell Qty: <strong>{totalSellQty.toLocaleString('en-IN')}</strong> ({(100 - buyPercent).toFixed(1)}%)</span>
            <span className="text-sm text-muted-foreground">Rs. {totalSellAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Qty Dist:</span>
          <div className="flex-1 h-5 rounded-full overflow-hidden flex">
            <div className="bg-success h-full flex items-center justify-center text-xs text-success-foreground font-medium" style={{ width: `${buyPercent}%` }}>
              {buyPercent.toFixed(1)}%
            </div>
            <div className="bg-destructive h-full flex items-center justify-center text-xs text-destructive-foreground font-medium" style={{ width: `${100 - buyPercent}%` }}>
              {(100 - buyPercent).toFixed(1)}%
            </div>
          </div>
          <span className="text-sm text-muted-foreground">Total: {totalQty.toLocaleString('en-IN')}</span>
        </div>
      </Card>

      {/* Info Banner */}
      <div className="bg-warning/10 border border-warning/30 rounded-lg px-4 py-3">
        <p className="text-sm text-warning">
          This feature is available only for Trader's Zone Subscription soon.{' '}
          <span className="underline cursor-pointer font-medium">Click here</span> to upgrade your subscription.
        </p>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <SortHeader field="symbol" label="Symbol" />
                  <SortHeader field="type" label="Type" />
                  <SortHeader field="openPrice" label="Open Price" />
                  <SortHeader field="closePrice" label="Close Price" />
                  <SortHeader field="avgPrice" label="Avg. Price" />
                  <SortHeader field="changePercent" label="CH %" />
                  <SortHeader field="quantity" label="Quantity" />
                  <SortHeader field="amount" label="Amount" />
                  <SortHeader field="trade" label="Trade" />
                  <SortHeader field="brokerId" label="Broker ID" />
                  <SortHeader field="lastTransactionTime" label="Last Transaction Time" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((item, i) => (
                  <tr key={item.symbol + '-' + i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {item.symbol[0]}
                        </div>
                        <span className="text-sm font-medium text-primary">{item.symbol}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge className={cn(
                        "text-xs",
                        item.type === 'Buy'
                          ? "bg-success/15 text-success border-success/20"
                          : "bg-destructive/15 text-destructive border-destructive/20"
                      )}>
                        {item.type}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.openPrice}</td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.closePrice}</td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.avgPrice}</td>
                    <td className="px-3 py-3">
                      <div className={cn("flex items-center gap-1 text-sm tabular-nums", item.changePercent >= 0 ? "text-success" : "text-destructive")}>
                        {item.changePercent >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(item.changePercent)}%
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.quantity.toLocaleString('en-IN')}</td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.amount.toLocaleString('en-IN')}</td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.trade}</td>
                    <td className="px-3 py-3 text-sm tabular-nums">{item.brokerId}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground whitespace-nowrap">{item.lastTransactionTime}</td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-12 text-center text-muted-foreground">
                      No transactions found
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
