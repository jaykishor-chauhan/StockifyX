import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { WatchlistCard } from '@/components/market/WatchlistCard';
import { MiniSparkline } from '@/components/market/MiniSparkline';
import { watchlistData } from '@/data/mockData';
import { formatNumber, formatPercent, getChangeColor } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Star, Plus, Search, MoreVertical, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function WatchlistPage() {
  const { items } = watchlistData;

  return (
    <div className="section-padding py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            Watchlist
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your favorite stocks and monitor performance
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search in watchlist..." className="pl-9" />
      </div>

      {/* Watchlist Grid */}
      <div className="grid gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-card transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Stock Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{item.symbol}</span>
                      {item.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.name}</p>
                  </div>

                  {/* Chart */}
                  {item.graphData && item.graphData.length > 0 && (
                    <div className="hidden md:block">
                      <MiniSparkline data={item.graphData} isPositive={item.change >= 0} />
                    </div>
                  )}

                  {/* Stats */}
                  <div className="hidden sm:grid grid-cols-3 gap-6 text-right">
                    <div>
                      <p className="text-xs text-muted-foreground">High</p>
                      <p className="font-medium">{formatNumber(item.high || 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Low</p>
                      <p className="font-medium">{formatNumber(item.low || 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Volume</p>
                      <p className="font-medium">{(item.quantity || 0).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-bold">Rs. {formatNumber(item.price || 0)}</p>
                    <p className={cn("text-sm font-medium", getChangeColor(item.change))}>
                      {item.change >= 0 ? '+' : ''}{formatNumber(item.change)} ({formatPercent(item.changePercent)})
                    </p>
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <Card className="p-12 text-center">
          <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No stocks in watchlist</h3>
          <p className="text-muted-foreground mb-4">
            Start adding stocks to track their performance
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Stock
          </Button>
        </Card>
      )}
    </div>
  );
}
