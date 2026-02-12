import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WatchlistItem } from '@/types/market';
import { formatNumber, formatPercent, getChangeColor } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { MiniSparkline } from './MiniSparkline';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistCardProps {
  items: WatchlistItem[];
}

export function WatchlistCard({ items }: WatchlistCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          Your Watchlist
        </CardTitle>
        <Badge variant="secondary">{items.length} stocks</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            {/* Stock Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold">{item.symbol}</span>
                {item.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{item.name}</p>
            </div>

            {/* Mini Chart */}
            {item.graphData && item.graphData.length > 0 && (
              <div className="mini-chart hidden sm:block">
                <MiniSparkline data={item.graphData} isPositive={item.change >= 0} />
              </div>
            )}

            {/* Price Info */}
            <div className="text-right">
              <p className="font-semibold">Rs. {formatNumber(item.price || 0)}</p>
              <p className={cn("text-sm font-medium", getChangeColor(item.change))}>
                {formatPercent(item.changePercent)}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
