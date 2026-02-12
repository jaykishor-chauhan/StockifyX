import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  color: string;
}

const tabs = ['Stocks in News', 'Most Traded', 'Most Bought MTF', 'Most Delivered in Portfolio', 'Most Searched', 'Most Ple'];

const trendingStocks: Stock[] = [
  { symbol: 'B', name: 'Bank of India', price: 163.66, change: 0.20, changePercent: 0.12, color: 'bg-blue-600' },
  { symbol: 'B', name: 'Bharti Airtel', price: 2038.40, change: 46.00, changePercent: 2.31, color: 'bg-red-500' },
  { symbol: 'C', name: 'Century Plyboards', price: 797.80, change: 12.05, changePercent: 1.53, color: 'bg-pink-500' },
  { symbol: 'P', name: 'PB FinTech', price: 1504.90, change: -47.90, changePercent: -3.08, color: 'bg-purple-600' },
  { symbol: 'M', name: 'MRF', price: 146455.00, change: 11485.00, changePercent: 8.51, color: 'bg-red-600' },
  { symbol: 'H', name: 'HCL Technologies', price: 1593.70, change: 0, changePercent: 0, color: 'bg-indigo-600' },
  { symbol: 'B', name: 'BLS International Services', price: 292.40, change: -7.70, changePercent: -2.57, color: 'bg-blue-500' },
  { symbol: 'T', name: 'Tata Motors Passenger Vehicles', price: 369.50, change: -4.65, changePercent: -1.24, color: 'bg-blue-700' },
  { symbol: 'B', name: 'BEML', price: 1617.40, change: -128.80, changePercent: -7.38, color: 'bg-orange-500' },
  { symbol: 'S', name: 'Siemens', price: 3176.20, change: -123.80, changePercent: -3.75, color: 'bg-teal-600' },
];

export function TrendingStocks() {
  const [activeTab, setActiveTab] = useState('Stocks in News');

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <h3 className="text-base font-semibold mb-4">Trending Stocks</h3>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-200",
              activeTab === tab
                ? "bg-success/10 border-success text-success"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stock List */}
      <div className="divide-y divide-border">
        {trendingStocks.map((stock, i) => (
          <div key={i} className="flex items-center gap-3 py-3 group cursor-pointer hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-colors">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm",
              stock.color
            )}>
              {stock.symbol}
            </div>
            <span className="flex-1 text-sm font-medium group-hover:text-primary transition-colors">{stock.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm tabular-nums font-semibold">{stock.price.toLocaleString()}</span>
              <span className={cn(
                "text-xs tabular-nums flex items-center gap-1 font-medium min-w-[100px] justify-end",
                stock.change > 0 ? "text-success" : stock.change < 0 ? "text-destructive" : "text-muted-foreground"
              )}>
                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                {stock.change > 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : stock.change < 0 ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : null}
              </span>
              <button className="p-1.5 hover:bg-muted rounded-md transition-colors opacity-0 group-hover:opacity-100">
                <Plus className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
        view all stocks
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
