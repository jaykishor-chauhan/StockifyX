import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Stock } from '@/types/market';
import { formatNumber, formatPercent, getChangeColor, formatCompactNumber } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { MiniSparkline } from './MiniSparkline';

interface StockCardProps {
  stock: Stock;
  delay?: number;
  showTurnover?: boolean;
  showTransactions?: boolean;
  showShares?: boolean;
  graphData?: { value: number }[];
}

export function StockCard({ 
  stock, 
  delay = 0, 
  showTurnover, 
  showTransactions, 
  showShares,
  graphData 
}: StockCardProps) {
  const isPositive = stock.change >= 0;
  const price = stock.lastTradedPrice || stock.price || 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.05 }}
    >
      <Card className="p-4 hover:shadow-card transition-all cursor-pointer hover:border-primary/30 group">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">{stock.symbol}</span>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {stock.name}
            </p>
          </div>

          {graphData && graphData.length > 0 && (
            <div className="mini-chart">
              <MiniSparkline data={graphData} isPositive={isPositive} />
            </div>
          )}
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-price">Rs. {formatNumber(price)}</p>
            <div className={cn("flex items-center gap-1.5 mt-1", getChangeColor(stock.change))}>
              <span className="text-change">
                {stock.change >= 0 ? '+' : ''}{formatNumber(stock.change)}
              </span>
              <span className="text-change">
                ({formatPercent(stock.changePercent)})
              </span>
            </div>
          </div>

          <div className="text-right">
            {showTurnover && stock.turnover && (
              <div className="text-sm">
                <span className="text-muted-foreground">Turnover: </span>
                <span className="font-medium">{formatCompactNumber(stock.turnover)}</span>
              </div>
            )}
            {showTransactions && stock.transactions && (
              <div className="text-sm">
                <span className="text-muted-foreground">Txns: </span>
                <span className="font-medium">{stock.transactions.toLocaleString()}</span>
              </div>
            )}
            {showShares && stock.sharesTraded && (
              <div className="text-sm">
                <span className="text-muted-foreground">Shares: </span>
                <span className="font-medium">{formatCompactNumber(stock.sharesTraded)}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface StockListItemProps {
  stock: Stock;
  rank?: number;
}

export function StockListItem({ stock, rank }: StockListItemProps) {
  const isPositive = stock.change >= 0;
  const price = stock.lastTradedPrice || stock.price || 0;

  return (
    <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
      {rank && (
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
          {rank}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{stock.symbol}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
      </div>

      <div className="text-right">
        <p className="font-semibold">Rs. {formatNumber(price)}</p>
        <p className={cn("text-sm font-medium", getChangeColor(stock.change))}>
          {formatPercent(stock.changePercent)}
        </p>
      </div>
    </div>
  );
}
