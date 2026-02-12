import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Index {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const keyIndices: Index[] = [
  { name: 'NEPSE', value: 2708.70, change: 27.19, changePercent: 1.01 },
  { name: 'Banking', value: 1372.22, change: 7.71, changePercent: 0.56 },
  { name: 'Float', value: 186.27, change: 2.06, changePercent: 1.11 },
  { name: 'HydroPower', value: 3581.43, change: 58.50, changePercent: 1.66 },
  { name: 'Microfinance', value: 4937.05, change: 29.55, changePercent: 0.60 },
  { name: 'Life Insurance', value: 13042.24, change: 143.85, changePercent: 1.11 },
  { name: 'Sensitive', value: 460.48, change: 4.47, changePercent: 0.98 },
  { name: 'Trading', value: 3791.06, change: -18.51, changePercent: -0.48 },
  { name: 'Non Life Insurance', value: 11255.86, change: 218.92, changePercent: 1.98 },
  { name: 'Manufacturing', value: 240399.00, change: -3416.00, changePercent: -1.40 },
  { name: 'Development Bank', value: 152933.00, change: 862.00, changePercent: 0.57 },
];

export function KeyIndices() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <h3 className="text-base font-semibold mb-5">Key Indices & Commodities</h3>

      <div className="grid grid-cols-3 gap-x-8 gap-y-4">
        {keyIndices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div
              key={index.name}
              className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {index.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm tabular-nums font-semibold">
                  {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className={cn(
                    'text-xs tabular-nums font-medium flex items-center gap-0.5',
                    isPositive ? 'text-success' : 'text-destructive'
                  )}
                >
                  {isPositive ? '+' : ''}
                  {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
        view all Indices
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
