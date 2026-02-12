import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketSummaryItem, StockSummary } from '@/types/market';
import { formatCompactNumber } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Activity, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface MarketSummaryCardProps {
  summary: MarketSummaryItem[];
  stockSummary: StockSummary;
}

export function MarketSummaryCard({ summary, stockSummary }: MarketSummaryCardProps) {
  const getSummaryIcon = (name: string) => {
    if (name.includes('Turnover')) return Activity;
    if (name.includes('Transaction')) return Activity;
    return Activity;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Market Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stock Movement Summary */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="text-2xl font-bold">{stockSummary.advanced}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Advanced</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-destructive">
              <TrendingDown className="w-4 h-4" />
              <span className="text-2xl font-bold">{stockSummary.declined}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Declined</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Minus className="w-4 h-4" />
              <span className="text-2xl font-bold">{stockSummary.unchanged}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unchanged</p>
          </div>
        </div>

        {/* Circuit Breakers */}
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
            <ArrowUpCircle className="w-5 h-5 text-success" />
            <div>
              <p className="text-lg font-bold text-success">{stockSummary.positiveCircuit}</p>
              <p className="text-xs text-muted-foreground">Upper Circuit</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <ArrowDownCircle className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-lg font-bold text-destructive">{stockSummary.negativeCircuit}</p>
              <p className="text-xs text-muted-foreground">Lower Circuit</p>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="space-y-3">
          {summary.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
            >
              <span className="text-sm text-muted-foreground">{item.name.replace(' Rs:', '').replace('Total ', '')}</span>
              <span className="font-semibold">{formatCompactNumber(item.value)}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
