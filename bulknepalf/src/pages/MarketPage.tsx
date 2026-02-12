import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { IndexCard, MarketStatusBanner } from '@/components/market/IndexCard';
import { StockCard } from '@/components/market/StockCard';
import { MarketSummaryCard } from '@/components/market/MarketSummary';
import {
  indices,
  subIndices,
  marketStatus,
  marketSummary,
  stockSummary,
  topGainers,
  topLosers,
  topTurnover,
  topTradedShares,
  topTransactions,
} from '@/data/mockData';
import { TrendingUp, TrendingDown, Activity, BarChart3, Layers } from 'lucide-react';

export default function MarketPage() {
  return (
    <div className="section-padding py-6 space-y-6">
      {/* Market Status */}
      <MarketStatusBanner isOpen={marketStatus.isOpen} asOf={marketStatus.updatedAt} />

      {/* Main Indices */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Main Indices
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {indices.map((index, i) => (
            <IndexCard key={index.symbol} index={index} delay={i} />
          ))}
        </div>
      </section>

      {/* Sub-Indices */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Sector Indices
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {subIndices.map((index, i) => (
            <motion.div
              key={index.symbol}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-4 hover:shadow-card transition-all cursor-pointer hover:border-primary/30">
                <p className="text-sm text-muted-foreground truncate">{index.name}</p>
                <p className="text-lg font-bold mt-1">{index.currentValue.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm font-medium ${index.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {index.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Market Summary */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MarketSummaryCard summary={marketSummary} stockSummary={stockSummary} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <Tabs defaultValue="gainers">
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="gainers" className="text-xs sm:text-sm">
                    <TrendingUp className="w-4 h-4 mr-1 hidden sm:inline" />
                    Gainers
                  </TabsTrigger>
                  <TabsTrigger value="losers" className="text-xs sm:text-sm">
                    <TrendingDown className="w-4 h-4 mr-1 hidden sm:inline" />
                    Losers
                  </TabsTrigger>
                  <TabsTrigger value="turnover" className="text-xs sm:text-sm">
                    Turnover
                  </TabsTrigger>
                  <TabsTrigger value="shares" className="text-xs sm:text-sm">
                    Shares
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="text-xs sm:text-sm">
                    Txns
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-4">
                <TabsContent value="gainers" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topGainers.map((stock, i) => (
                      <StockCard key={stock.symbol} stock={stock} delay={i} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="losers" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topLosers.map((stock, i) => (
                      <StockCard key={stock.symbol} stock={stock} delay={i} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="turnover" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topTurnover.map((stock, i) => (
                      <StockCard key={stock.symbol} stock={stock} delay={i} showTurnover />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="shares" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topTradedShares.map((stock, i) => (
                      <StockCard key={stock.symbol} stock={stock} delay={i} showShares />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="transactions" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {topTransactions.map((stock, i) => (
                      <StockCard key={stock.symbol} stock={stock} delay={i} showTransactions />
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
