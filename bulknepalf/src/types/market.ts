import { JSX } from "react/jsx-runtime";

export interface MarketStatus {
  isOpen: boolean;
  updatedAt: string
}

export interface PrimaryIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface MarketSummaryItem {
  name: string;
  value: number;
}
// MarketSummary should be an array of summary items
// Use `MarketSummaryItem[]` where needed.
export type MarketSummary = MarketSummaryItem[];

export interface LiveTickerItem {
  name: string;
  sector: string;
  ltp: number;
  change: number;
  changePercent: number;
}

export interface LiveTicker {
  index: LiveTickerItem[];
  subIndex: LiveTickerItem[];
  listedCompany: LiveTickerItem[];
  topGainer: LiveTickerItem[];
  topLoser: LiveTickerItem[];
  topTraded: LiveTickerItem[];
  topTransaction: LiveTickerItem[];
  topTurnover: LiveTickerItem[];
}

export interface TopStockItem {
  index: string;
  script: string;
  name: string;
  ltp: number;
  change: number;
  turnover: number;
  tradedQty: number;
  changePercent: number;
  icon: string
}

export interface TopStocks {
  topGainers: TopStockItem[];
  topLosers: TopStockItem[];
  topTraded: TopStockItem[];
  topTurnover: TopStockItem[];
}

export interface IPOListItem {
  id: number;
  slug: string;
  symbol: string;
  name: string;
  iconUrl?: string | null;
  sector?: string | null;
  units: number;
  price: number;
  priceUpto?: number | null;
  totalAmount: number;
  openingDate?: string | null;
  closingDate?: string | null;
  extendedClosingDate?: string | null;
  bookClosureDate?: string | null;
  resultPublishedDate?: string | null;
  listingDate?: string | null;
  issueManager: string;
  remarks?: string;
  type: 'Ipo' | 'RightShare' | 'FPO';
  for: 'GeneralPublic' | 'Mutual' | 'Local';
  status: 'Open' | 'ComingSoon' | 'Closed';
  cutOffPrice?: number | null;
  prospectus?: string | null;
  ratingData?: any | null;
  newsUrl?: string | null;
  securityId?: number | null;
  rightShareRatio?: string | null;
}

export interface IPOs {
  items: IPOListItem[];
}


export interface ListedCompany {
  symbol: string;
  securityName: string;
  securityId: string;
  sector: string;
  iconUrl: string;
  indexId: string | null;
  lastTradedPrice: number;
  lastTradedVolume: number;
  change: number;
  percentageChange: number;
  previousClose: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  totalTradeQuantity: number;
  totalTradeValue: number;
  totalTransactions: number;
  lastUpdatedDateTime: string;
}

// Back-compat with the previous misspelled type name.
export type ListdCompany = ListedCompany;



// ---------------------------------------------------
export interface StockSummary {
  advanced: number;
  declined: number;
  unchanged: number;
  positiveCircuit: number;
  negativeCircuit: number;
}

export interface Index {
  name: string;
  symbol: string;
  currentValue: number;
  change: number;
  changePercent: number;
  sector?: string | null;
}

export interface Stock {
  symbol: string;
  name: string;
  icon?: string;
  iconUrl?: string;
  logo?: string;
  lastTradedPrice?: number;
  price?: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  quantity?: number;
  turnover?: number;
  sharesTraded?: number;
  transactions?: number;
  date?: string;
  previousClose?: number;
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  sector?: string;
}

export interface WatchlistItem extends Stock {
  id: number;
  units?: number;
  wacc?: number;
  graphData?: ChartDataPoint[];
}

export interface ChartDataPoint {
  value: number;
  changePercent: number;
  date: string;
}

export interface Watchlist {
  name: string;
  id: number;
  isPrimary: boolean;
  items: WatchlistItem[];
}

export interface Announcement {
  id: number;
  title: string;
  symbol?: string;
  securityName?: string;
  iconUrl?: string | null;
  subTitle?: string;
  details?: string;
  announcementDate: string;
  attachmentUrl?: string | null;
  newsUrl?: string | null;
  isEvent: boolean;
  eventDate?: string | null;
  source: string;
  category: string;
  type: 'Announcement' | 'NewsAndAlert';
  time: number;
}

export interface Post {
  id: number;
  slug: string;
  profileName: string;
  profileImageUrl: string;
  userName: string;
  isProfileVerified: boolean;
  title: string;
  summary: string;
  reactionCount: number;
  commentCount: number;
  shareCount: number;
  mediaType: string;
  mediaUrl: string;
  launchUrl: string;
  isPromoted: boolean;
  timeAgo: string;
  publishedDate: string;
}

export interface BulkTransaction {
  contractId: number;
  symbol: string;
  name: string;
  iconUrl?: string;
  quantity: number;
  rate: number;
  amount: number;
  buyerBrokerId: string;
  buyerBrokerName: string;
  sellerBrokerId: string;
  sellerBrokerName: string;
  tradedTime: string;
}

export interface HomepageData {
  marketStatus: MarketStatus;
  marketSummary: MarketSummaryItem[];
  stockSummary: StockSummary;
  indices: Index[];
  subIndices: Index[];
  topGainers: Stock[];
  topLosers: Stock[];
  topTurnover: Stock[];
  topTradedShares: Stock[];
  topTransactions: Stock[];
  liveCompanyData: Stock[];
}

export type ThemeMode = 'light' | 'dark' | 'colored';
