import { Eye, EyeOff, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const portfolioTabs = ['All', 'Stocks', 'Mutual Fund', 'ETFs', 'Smallcases'];

export function PortfolioSummary() {
  const [activeTab, setActiveTab] = useState('All');
  const [showValue, setShowValue] = useState(true);

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      {/* Header with Tabs */}
      <div className="flex items-center gap-6 mb-5">
        <h2 className="text-base font-semibold">My Portfolio</h2>
        <div className="flex gap-1 bg-muted/50 rounded-full p-1">
          {portfolioTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-4 gap-8 mb-5">
        <div>
          <p className="text-xs text-primary font-medium mb-1.5">Investment</p>
          <p className="text-xl font-bold tabular-nums">रू 0.00</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Current Value</p>
          <p className="text-xl font-bold tabular-nums">रू 0.00</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Overall Profits</p>
          <p className="text-xl font-bold tabular-nums">
            रू 0.00 <span className="text-sm font-normal text-muted-foreground">(0.00%)</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1.5">Today's Profit</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold tabular-nums">
              रू 0.00 <span className="text-sm font-normal text-muted-foreground">(0.00%)</span>
            </p>
            <button 
              onClick={() => setShowValue(!showValue)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              {showValue ? (
                <Eye className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="flex items-center gap-8 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Today's P&L:</span>
          <span className="text-sm font-semibold tabular-nums">रू 0.00</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground">Open Positions:</span>
          <span className="text-sm font-semibold">0</span>
          <span className="text-muted-foreground text-sm">›</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Margin Available:</span>
          <span className="text-sm font-semibold tabular-nums">रू 0.00</span>
        </div>
        
        {/* Balance & Top Up */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="px-4 py-2 bg-muted/50 rounded-lg border border-border">
            <span className="text-sm font-semibold tabular-nums">रू 50,000.00</span>
          </div>
          <Button className="h-9 px-4 bg-success hover:bg-success/90 text-white font-medium shadow-sm">
            <Plus className="w-4 h-4 mr-1.5" />
            Top Up
          </Button>
        </div>
      </div>
    </div>
  );
}
