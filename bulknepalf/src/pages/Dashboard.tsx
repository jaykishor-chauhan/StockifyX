import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { InvestTradeSection } from '@/components/dashboard/InvestTradeSection';
import { TrendingStocks } from '@/components/dashboard/TrendingStocks';
import { AlertBanner } from '@/components/dashboard/AlertBanner';
import { KeyIndices } from '@/components/dashboard/KeyIndices';
import { IPOSection } from '@/components/dashboard/IPOSection';
import { TradingTools } from '@/components/dashboard/TradingTools';
import { MorePowerSection } from '@/components/dashboard/MorePowerSection';

export default function Dashboard() {
  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-4">
          <AlertBanner />
          <PortfolioSummary />
          <InvestTradeSection />
          <TrendingStocks />
          <KeyIndices />
          <IPOSection />
          <TradingTools />
          <MorePowerSection />
        </div>
      </div>

      {/* Right Sidebar - Market Movers */}
      <RightSidebar />
    </div>
  );
}