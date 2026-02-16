import { Zap, Grid3X3, Bell, LineChart, Settings, BookOpen, TrendingDown } from 'lucide-react';

import { AlertBanner } from '../components/AlertBanner';
import MarketMover from '@/components/dashboard/MarketMover';
import MarketSummary from '@/components/dashboard/MarketSummary';
import IPOs from '@/components/dashboard/IPOs';
import TradingIndex from '@/components/dashboard/TradingIndex';
import PortfolioIndex from '@/components/dashboard/PortfolioIndex';
import ListedCompany from '@/components/dashboard/ListedCompany';

const portfolioTabs = ['All', 'Stocks', 'Mutual Fund', 'ETFs', 'Smallcases'];
interface Tool {
  icon: React.ReactNode;
  name: string;
}

interface IPO {
  symbol: string;
  name: string;
  issueSize: string;
  color: string;
  status: 'apply' | 'pre-apply';
}


interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  color: string;
}



export function Dashboard() {
  const tools: Tool[] = [
    { icon: <Zap className="w-5 h-5 text-primary" />, name: 'Power Scalper' },
    { icon: <Grid3X3 className="w-5 h-5 text-muted-foreground" />, name: 'Advanced Option Chain' },
    { icon: <Bell className="w-5 h-5 text-warning" />, name: 'Price Alerts' },
    { icon: <LineChart className="w-5 h-5 text-primary" />, name: 'TradingView Webhook' },
    { icon: <Settings className="w-5 h-5 text-success" />, name: "Trader's Controls" },
    { icon: <BookOpen className="w-5 h-5 text-warning" />, name: "Trader's Diary" },
  ];



  return (
    <div className='space-y-4 mx-4 my-[1.5em] '>
      {/* <AlertBanner /> */}
      {/* <PortfolioIndex /> */}

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5 shadow-sm">
          ...
        </div>
        <MarketSummary />
        <TradingIndex />
        <MarketMover />
      </div>

      <ListedCompany />
      <IPOs />
    </div>
  );
}


export default Dashboard;