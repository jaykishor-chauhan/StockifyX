import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IPO {
  symbol: string;
  name: string;
  issueSize: string;
  color: string;
  status: 'apply' | 'pre-apply';
}

const ipos: IPO[] = [
  { symbol: 'B', name: 'Biopol Chemicals', issueSize: '₹ 31.26 Cr', color: 'bg-green-600', status: 'apply' },
  { symbol: 'P', name: 'PAN HR Solutions', issueSize: '₹ 17.04 Cr', color: 'bg-purple-600', status: 'apply' },
  { symbol: 'M', name: 'Marushika Technology', issueSize: '₹ 26.97 Cr', color: 'bg-blue-600', status: 'pre-apply' },
];

export function IPOSection() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <h3 className="text-base font-semibold mb-5">IPOs</h3>

      <div className="space-y-1">
        {ipos.map((ipo) => (
          <div
            key={ipo.name}
            className="flex items-center gap-3 hover:bg-muted/50 -mx-2 px-2 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full ${ipo.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
            >
              {ipo.symbol}
            </div>
            <span className="flex-1 text-sm font-medium">{ipo.name}</span>
            <span className="text-xs text-muted-foreground">
              Issue Size: {ipo.issueSize}
            </span>
            {ipo.status === 'apply' ? (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-success text-success hover:bg-success/10 rounded-full px-4"
              >
                Apply
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-primary text-primary hover:bg-primary/10 rounded-full px-4"
              >
                Pre-Apply
              </Button>
            )}
          </div>
        ))}
      </div>

      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
        more
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
