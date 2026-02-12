import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Index } from '@/types/market';
import { formatNumber, formatPercent, getChangeColor } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface IndexCardProps {
  index: Index;
  delay?: number;
}

export function IndexCard({ index, delay = 0 }: IndexCardProps) {
  const isPositive = index.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      <Card className="stat-card hover:shadow-glow transition-shadow cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
            <p className="text-2xl font-bold mt-1">{formatNumber(index.currentValue)}</p>
          </div>
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              isPositive ? "bg-success/10" : "bg-destructive/10"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-success" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>
        </div>
        <div className={cn("flex items-center gap-2 mt-3", getChangeColor(index.change))}>
          <span className="text-sm font-medium">
            {index.change >= 0 ? '+' : ''}{formatNumber(index.change)}
          </span>
          <span className="text-sm font-medium">
            ({formatPercent(index.changePercent)})
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

interface MarketStatusBannerProps {
  isOpen: boolean;
  asOf: string;
}

export function MarketStatusBanner({ isOpen, asOf }: MarketStatusBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border",
        isOpen 
          ? "bg-success/10 border-success/20" 
          : "bg-destructive/10 border-destructive/20"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            isOpen ? "market-open" : "market-closed"
          )}
        />
        <div>
          <p className="font-semibold">
            Market is {isOpen ? 'Open' : 'Closed'}
          </p>
          <p className="text-sm text-muted-foreground">
            As of {new Date(asOf).toLocaleString('en-NP')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
