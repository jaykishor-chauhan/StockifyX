import { ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InvestOption {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const investOptions: InvestOption[] = [
  { 
    icon: <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center"><span className="text-lg">🌐</span></div>, 
    label: 'Equities',
    color: 'text-blue-600'
  },
  { 
    icon: <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center"><span className="text-lg">🌿</span></div>, 
    label: 'Mutual Funds',
    color: 'text-green-600'
  },
  { 
    icon: <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center"><span className="text-lg">🎯</span></div>, 
    label: 'ETFs',
    color: 'text-orange-600'
  },
  { 
    icon: <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center"><span className="text-lg">📊</span></div>, 
    label: 'Options',
    color: 'text-purple-600'
  },
  { 
    icon: <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center"><span className="text-lg">📈</span></div>, 
    label: 'Futures',
    color: 'text-indigo-600'
  },
  { 
    icon: <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center"><span className="text-lg">⛰️</span></div>, 
    label: 'Commodities',
    color: 'text-amber-600'
  },
];

export function InvestTradeSection() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <h3 className="text-base font-semibold mb-5">Invest / Trade on Stock Exchanges</h3>
      
      <div className="grid grid-cols-3 gap-x-8 gap-y-4 mb-4">
        {investOptions.map((option) => (
          <button
            key={option.label}
            className="flex items-center gap-3 p-2 -ml-2 hover:bg-muted/50 rounded-lg transition-colors text-left group"
          >
            {option.icon}
            <span className="text-sm font-medium group-hover:text-primary transition-colors">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Rent Stocks */}
      <div className="border-t border-border pt-4 mt-4">
        <button className="flex items-center gap-3 p-2 -ml-2 w-full hover:bg-muted/50 rounded-lg transition-colors group">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
            <span className="text-lg">🎁</span>
          </div>
          <span className="text-sm font-medium group-hover:text-primary transition-colors">Rent Stocks</span>
          <span className="text-xs text-muted-foreground">Earn upto 18% pa with SLBM</span>
          <Badge className="bg-success/15 text-success border-success/30 text-[10px] px-2 py-0.5 font-medium">
            <Sparkles className="w-2.5 h-2.5 mr-1" />
            New
          </Badge>
          <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>
    </div>
  );
}
