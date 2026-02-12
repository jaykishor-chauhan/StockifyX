import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowUp, ArrowDown, TrendingUp, TrendingDown, Eye, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

// Mock stock data keyed by symbol
const stockDatabase: Record<string, StockData> = {
  PFL: {
    symbol: 'PFL',
    name: 'Pokhara Finance Ltd.',
    sector: 'Finance',
    status: 'Active',
    ltp: 385,
    change: 1,
    changePercent: 0.26,
    open: 384.9,
    high: 389,
    highPercent: 1.30,
    low: 377,
    lowPercent: -1.82,
    prevClose: 384,
    turnover: 51_22_711.4,
    quantity: 13392,
    trades: 120,
    yearYield: -6.55,
    eps: 43.2,
    fiscalYear: '082-083, Q2',
    peRatio: 8.91,
    bookValue: 78.22,
    pbv: 4.92,
    marketCap: 4_16_78_43_295,
    floatMarketCap: 1_66_71_37_010,
    paidUpCapital: 1_08_25_56_700,
    lastUpdated: 'Feb 5 02:59 PM',
  },
  NHPC: {
    symbol: 'NHPC',
    name: 'Nepal Hydro Power Company',
    sector: 'Hydropower',
    status: 'Active',
    ltp: 215.80,
    change: 8.80,
    changePercent: 4.25,
    open: 210,
    high: 218,
    highPercent: 3.81,
    low: 208,
    lowPercent: -0.95,
    prevClose: 207,
    turnover: 32_45_000,
    quantity: 15200,
    trades: 89,
    yearYield: 12.5,
    eps: 18.4,
    fiscalYear: '082-083, Q2',
    peRatio: 11.73,
    bookValue: 125.6,
    pbv: 1.72,
    marketCap: 5_20_00_00_000,
    floatMarketCap: 2_10_00_00_000,
    paidUpCapital: 2_40_00_00_000,
    lastUpdated: 'Feb 5 02:59 PM',
  },
  NABIL: {
    symbol: 'NABIL',
    name: 'Nabil Bank Ltd.',
    sector: 'Commercial Bank',
    status: 'Active',
    ltp: 1280,
    change: 15,
    changePercent: 1.19,
    open: 1270,
    high: 1295,
    highPercent: 1.98,
    low: 1265,
    lowPercent: -0.39,
    prevClose: 1265,
    turnover: 8_50_00_000,
    quantity: 6700,
    trades: 210,
    yearYield: 8.2,
    eps: 52.3,
    fiscalYear: '082-083, Q2',
    peRatio: 24.47,
    bookValue: 310.5,
    pbv: 4.12,
    marketCap: 96_00_00_00_000,
    floatMarketCap: 42_00_00_00_000,
    paidUpCapital: 7_50_00_00_000,
    lastUpdated: 'Feb 5 02:59 PM',
  },
};

interface StockData {
  symbol: string;
  name: string;
  sector: string;
  status: string;
  ltp: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  highPercent: number;
  low: number;
  lowPercent: number;
  prevClose: number;
  turnover: number;
  quantity: number;
  trades: number;
  yearYield: number;
  eps: number;
  fiscalYear: string;
  peRatio: number;
  bookValue: number;
  pbv: number;
  marketCap: number;
  floatMarketCap: number;
  paidUpCapital: number;
  lastUpdated: string;
}

// Generate mock chart data
const generateChartData = () => {
  const data = [];
  let price = 383;
  for (let hour = 11; hour <= 14; hour++) {
    for (let min = 0; min < 60; min += 10) {
      price += (Math.random() - 0.48) * 3;
      data.push({
        time: `${hour}:${min.toString().padStart(2, '0')}`,
        price: Math.round(price * 100) / 100,
      });
    }
  }
  return data;
};

const chartData = generateChartData();

const detailTabs = [
  'Overview', 'Market Depth', 'Floorsheet', 'Bulk Transaction',
  'Broker Analysis', 'Price History', 'Price Action', 'Fundamental',
  'Technical', 'Dividends', 'Right Shares',
];

const chartPeriods = ['1D', '1W', '3M', '6M', '1Y', '5Y', 'ALL'];

export default function StockDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [chartPeriod, setChartPeriod] = useState('1D');

  const stock = stockDatabase[symbol?.toUpperCase() || ''];

  if (!stock) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <p className="text-muted-foreground">Stock "{symbol}" not found.</p>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  const statItems = [
    { label: 'LTP', value: `Rs. ${stock.ltp.toLocaleString()}`, color: isPositive ? 'text-success' : 'text-destructive', icon: '₹' },
    { label: 'Open', value: `Rs. ${stock.open.toLocaleString()}`, icon: '☀' },
    { label: 'High', value: `Rs. ${stock.high.toLocaleString()}`, sub: `(${stock.highPercent}%)`, icon: '↑' },
    { label: 'Low', value: `Rs. ${stock.low.toLocaleString()}`, sub: `(${stock.lowPercent}%)`, icon: '↓' },
    { label: 'Pr. Close', value: `Rs. ${stock.prevClose.toLocaleString()}`, icon: '$' },
    { label: 'Turnover', value: stock.turnover.toLocaleString(), icon: '↗' },
    { label: 'Quantity', value: stock.quantity.toLocaleString(), icon: '📊' },
  ];

  const statRow2 = [
    { label: 'Trades', value: stock.trades.toString() },
    { label: '1 yr. Yield', value: `${stock.yearYield}%`, color: stock.yearYield >= 0 ? 'text-success' : 'text-destructive' },
    { label: 'EPS', value: stock.eps.toString() },
    { label: 'Fiscal Yr.', value: stock.fiscalYear },
    { label: 'P/E Ratio', value: stock.peRatio.toString() },
    { label: 'Book Value', value: stock.bookValue.toString() },
    { label: 'PBV', value: stock.pbv.toString() },
  ];

  const performanceItems = [
    { label: '1 Year Yield', value: `${stock.yearYield}%` },
    { label: 'EPS', value: stock.eps.toString() },
    { label: 'Fiscal Year', value: stock.fiscalYear },
    { label: 'P/E Ratio', value: stock.peRatio.toString() },
    { label: 'Book Value', value: stock.bookValue.toString() },
    { label: 'PBV', value: stock.pbv.toString() },
  ];

  const generalInfo = [
    { label: 'Symbol', value: stock.symbol },
    { label: 'Market Capitalization', value: `Rs. ${stock.marketCap.toLocaleString()}` },
    { label: 'Market Capitalization (Float)', value: `Rs. ${stock.floatMarketCap.toLocaleString()}` },
    { label: 'Paid Up Capital', value: `Rs. ${stock.paidUpCapital.toLocaleString()}` },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-full overflow-x-hidden">
      {/* Stock Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-border flex items-center justify-center text-lg font-bold text-primary">
            {stock.symbol[0]}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold">{stock.symbol}</h1>
              <Badge className="bg-primary/20 text-primary border-0 text-xs">{stock.sector}</Badge>
              <Badge className="bg-success/20 text-success border-0 text-xs">{stock.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Rs.</span>
              <span className="text-3xl font-bold tabular-nums">{stock.ltp}</span>
              <span className={cn("text-sm font-medium tabular-nums", isPositive ? "text-success" : "text-destructive")}>
                {isPositive ? '+' : ''}{stock.change}
              </span>
              <Badge variant="outline" className={cn("text-xs", isPositive ? "border-success/50 text-success" : "border-destructive/50 text-destructive")}>
                {isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                {Math.abs(stock.changePercent)}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">⏱ {stock.lastUpdated}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-9 w-9"><Eye className="w-4 h-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9"><Bookmark className="w-4 h-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9"><Share2 className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      {/* Stat Cards Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statItems.map((s) => (
          <div key={s.label} className="stat-card flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className={cn("text-sm font-semibold tabular-nums", s.color)}>
              {s.value}
            </span>
            {s.sub && <span className="text-xs text-muted-foreground tabular-nums">{s.sub}</span>}
          </div>
        ))}
      </div>

      {/* Stat Cards Row 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {statRow2.map((s) => (
          <div key={s.label} className="stat-card flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className={cn("text-sm font-semibold tabular-nums", s.color)}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="overflow-x-auto scrollbar-hide border-b border-border">
        <div className="flex gap-1 min-w-max pb-1">
          {detailTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap",
                activeTab === tab
                  ? "bg-card border border-b-0 border-border text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content: 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* General Information */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold mb-4 text-sm border-b border-border pb-2">General Information</h3>
            <div className="space-y-3">
              {generalInfo.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {item.label}
                  </span>
                  <span className="font-medium tabular-nums text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Value */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold mb-4 text-sm border-b border-border pb-2">Performance Value</h3>
            <div className="space-y-3">
              {performanceItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex gap-2 mb-3 flex-wrap">
              {chartPeriods.map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded transition-colors",
                    chartPeriod === p
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} orientation="right" />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="hsl(var(--success))" fill="url(#chartGreen)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}