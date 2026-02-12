import { useState } from 'react';
import { ChevronRight, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketMover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  color: string;
}

interface AlgoItem {
  name: string;
  price: number;
  icon: string;
}

interface NewsItem {
  title: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  time: string;
}

interface CorporateAction {
  date: string;
  month: string;
  company: string;
  type: string;
}

const marketMovers: MarketMover[] = [
  { symbol: 'N', name: 'Niraj Ispat Industries', price: 257.41, change: 42.90, changePercent: 20.00, color: 'bg-indigo-600' },
  { symbol: 'P', name: 'Presstonic Engineering', price: 53.20, change: 8.80, changePercent: 19.82, color: 'bg-pink-500' },
  { symbol: 'I', name: 'IZMO', price: 841.45, change: 131.25, changePercent: 18.48, color: 'bg-purple-600' },
  { symbol: 'K', name: 'Kay Cee Energy & Infra', price: 137.55, change: 21.35, changePercent: 18.37, color: 'bg-emerald-500' },
  { symbol: 'A', name: 'Apollo Pipes', price: 313.40, change: 47.95, changePercent: 18.06, color: 'bg-teal-500' },
];

const algos: AlgoItem[] = [
  { name: "Holonomy's Short Strangles", price: 300000, icon: '💎' },
  { name: "Carry Forward Strangle", price: 250000, icon: '💎' },
  { name: "Zen Credit Spread Overnight", price: 100000, icon: '💎' },
];

const newsItems: NewsItem[] = [
  { 
    title: 'RAMINFO LIMITED Schedules Board Meeting for February 13, 2026 to Review Q3FY26...',
    symbol: 'RAMINFO',
    price: 64.50,
    change: 2.40,
    changePercent: 3.86,
    time: 'just now'
  },
  { 
    title: 'PB Fintech Reportedly Revives $1 Billion Fundraising Initiative',
    symbol: 'POLICYBZR',
    price: 1504.90,
    change: -47.90,
    changePercent: -3.08,
    time: '10 minutes ago'
  },
  { 
    title: "DMCC Speciality Chemicals Reports Q3FY26 Results, Approves Key Board Decisions",
    symbol: 'DMCC',
    price: 225.80,
    change: 2.15,
    changePercent: 0.96,
    time: '11 minutes ago'
  },
];

const corporateActions: CorporateAction[] = [
  { date: '07', month: 'Feb', company: 'Mahanagar Gas', type: 'Quarterly Results' },
  { date: '07', month: 'Feb', company: 'Hariom Pipe Indust...', type: 'Quarterly Results' },
  { date: '07', month: 'Feb', company: 'Highway Infrastruc...', type: 'Quarterly Results' },
  { date: '07', month: 'Feb', company: 'Tinna Rubber and I...', type: 'Quarterly Results' },
  { date: '07', month: 'Feb', company: 'Transchem', type: 'Quarterly Results' },
];

export function RightSidebar() {
  const [activeMoversTab, setActiveMoversTab] = useState<'gainers' | 'losers' | 'volume'>('gainers');

  return (
    <aside className="w-80 border-l border-border bg-card flex-shrink-0 hidden xl:flex flex-col overflow-auto">
      {/* Market Movers */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm mb-3">Market Movers</h3>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveMoversTab('gainers')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
              activeMoversTab === 'gainers'
                ? "border-success text-success bg-success/10"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <TrendingUp className="w-3 h-3" />
            Gainers
          </button>
          <button
            onClick={() => setActiveMoversTab('losers')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
              activeMoversTab === 'losers'
                ? "border-destructive text-destructive bg-destructive/10"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <TrendingDown className="w-3 h-3" />
            Losers
          </button>
          <button
            onClick={() => setActiveMoversTab('volume')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
              activeMoversTab === 'volume'
                ? "border-primary text-primary bg-primary/10"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            Top Volume
          </button>
        </div>

        {/* Movers List */}
        <div className="space-y-3">
          {marketMovers.map((mover, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold", mover.color)}>
                {mover.symbol}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{mover.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm tabular-nums font-semibold">{mover.price.toFixed(2)}</p>
                <p className="text-xs tabular-nums text-success flex items-center justify-end gap-0.5">
                  +{mover.change.toFixed(2)} ({mover.changePercent.toFixed(2)}%)
                  <TrendingUp className="w-3 h-3" />
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
          view all
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Featured Algos */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm mb-3">Featured Algos For Trading</h3>
        <div className="space-y-3">
          {algos.map((algo, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                <span className="text-sm">{algo.icon}</span>
              </div>
              <span className="flex-1 text-sm truncate group-hover:text-primary transition-colors">{algo.name}</span>
              <span className="text-xs text-muted-foreground">from रू {algo.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
          view all algos
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Corporate Action */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Corporate Action</h3>
          <button className="flex items-center gap-1.5 text-xs border border-border rounded-md px-2.5 py-1.5 hover:bg-muted transition-colors">
            All Markets
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {corporateActions.map((action, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-1.5 rounded-lg transition-colors">
              <div className="text-center bg-muted rounded-lg px-2.5 py-1.5 min-w-[40px]">
                <p className="text-sm font-bold leading-tight">{action.date}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{action.month}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{action.company}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{action.type}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
          view all
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Latest News */}
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Latest News</h3>
          <button className="flex items-center gap-1.5 text-xs border border-border rounded-md px-2.5 py-1.5 hover:bg-muted transition-colors">
            All Markets
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-4">
          {newsItems.map((news, i) => (
            <div key={i} className="group cursor-pointer">
              <p className="text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors font-medium">
                {news.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs font-semibold text-foreground">{news.symbol}</span>
                <span className="text-xs tabular-nums font-medium">{news.price.toFixed(2)}</span>
                <span className={cn(
                  "text-xs tabular-nums font-medium flex items-center gap-0.5",
                  news.change >= 0 ? "text-success" : "text-destructive"
                )}>
                  {news.change >= 0 ? '+' : ''}{news.change.toFixed(2)} ({news.changePercent.toFixed(2)}%)
                  {news.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">{news.time}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-4 ml-auto transition-colors">
          view all news
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
