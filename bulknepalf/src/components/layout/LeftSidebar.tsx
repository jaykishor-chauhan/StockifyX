import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Clock, Bookmark, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WatchlistItem {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  exchange?: string;
  type?: string;
}

interface WatchlistOption {
  name: string;
  stockCount: number;
}

const watchlistTabs = ['1', '2', '3', '4', '5', 'f', 'δ'];

const watchlistOptions: WatchlistOption[] = [
  { name: 'First Watchlist', stockCount: 2 },
  { name: 'F&O', stockCount: 20 },
  { name: 'Most Valued', stockCount: 24 },
  { name: 'Private Banks', stockCount: 19 },
  { name: 'Dividend Yield', stockCount: 24 },
  { name: 'FnO Stocks', stockCount: 207 },
  { name: 'FnO', stockCount: 14 },
];

const watchlistItems: WatchlistItem[] = [
  { symbol: 'NHPC', name: 'NHPC Limited', price: 215.8, change: 8.8, changePercent: 4.25, exchange: 'NSE', type: 'ES' },
  { symbol: 'STC', name: 'State Telecom', price: 5527, change: -24, changePercent: -0.43, exchange: 'NSE', type: 'ES' },
  { symbol: 'TRH', name: 'Tribhuwan Hydro', price: 764, change: 3.8, changePercent: 0.5, exchange: 'NSE', type: 'ES' },
  { symbol: 'NABIL', name: 'Nabil Bank', price: 1280, change: 15, changePercent: 1.19, exchange: 'NSE', type: 'ES' },
  { symbol: 'SCB', name: 'Standard Chartered', price: 850, change: -5, changePercent: -0.58, exchange: 'NSE', type: 'ES' },
];

const recentSearches = [
  { name: 'Nifty Option Chain', exchange: 'NSE', type: 'INDEX' },
  { name: 'Sagility', exchange: 'NSE', type: 'ES' },
  { name: 'Nifty 50', exchange: 'NSE', type: 'INDEX' },
  { name: 'Midcpnifty Option Summary', exchange: 'NSE', type: 'INDEX' },
  { name: 'Nifty Midcap Select', exchange: 'NSE', type: 'INDEX' },
  { name: 'Banknifty Future Summary', exchange: 'NSE', type: 'INDEX' },
  { name: 'Banknifty Option Summary', exchange: 'NSE', type: 'INDEX' },
  { name: 'FinNifty', exchange: 'NSE', type: 'INDEX' },
];

const fastSelectFilters = ['Indices', 'Opt. Chain', 'Top Picks'];

export function LeftSidebar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState('First Watchlist');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const watchlistRef = useRef<HTMLDivElement>(null);

  // Close search overlay on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (watchlistRef.current && !watchlistRef.current.contains(e.target as Node)) {
        setWatchlistOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSearchResults = recentSearches.filter((item) => {
    const matchesQuery = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesFilter = activeFilter
      ? (activeFilter === 'Indices' && item.type === 'INDEX') ||
      (activeFilter === 'Opt. Chain' && item.name.toLowerCase().includes('option')) ||
      (activeFilter === 'Top Picks' && item.type === 'ES')
      : true;
    return matchesQuery && matchesFilter;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveFilter(null);
  };

  const handleSelectWatchlist = (name: string) => {
    setSelectedWatchlist(name);
    setWatchlistOpen(false);
  };

  return (
    <aside className={cn("mt-6 space-x-8 flex-shrink-0 hidden lg:flex flex-col transition-all duration-300 w-80", "xl:w-96", "2xl:w-[400px]")}>
      {/* Search */}
      <div className="bg-card ml-8 mb-4 rounded-xl shadow-sm relative" ref={searchRef}>
        <div className="relative">
          <Input
            placeholder="Search for companies to invest or trade"
            className={cn(
              "pl-9 h-10 text-sm bg-background pr-9 transition-colors",
              searchFocused && "ring-2 ring-success border-success"
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {/* Clear button */}
          {(searchQuery || searchFocused) && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Overlay */}
        {searchFocused && (
          <div className="absolute top-full z-50 bg-card border border-border rounded-b-lg shadow-lg max-h-[70vh] overflow-auto">
            {/* Fast Select Filters */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Bookmark className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Fast Select from:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {fastSelectFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                    className={cn(
                      "px-4 py-1.5 rounded-full border text-sm font-medium transition-colors flex items-center gap-2",
                      activeFilter === filter
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {filter === 'Indices' && <BarChart3 className="w-3.5 h-3.5 text-primary" />}
                    {filter === 'Opt. Chain' && <span className="text-xs bg-primary/20 text-primary px-1 rounded">CE/PE</span>}
                    {filter === 'Top Picks' && <Star className="w-3.5 h-3.5 text-warning fill-warning" />}
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-primary">Recent Searches</span>
                </div>
                <button
                  onClick={handleClearSearch}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-0">
                {filteredSearchResults.map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between px-2 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => {
                      const sym = item.name.split(' ')[0].toUpperCase();
                      setSearchQuery('');
                      setSearchFocused(false);
                      navigate(`/stock/${sym}`);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-warning fill-warning flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{item.exchange}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-medium",
                        item.type === 'INDEX'
                          ? "border-primary/50 text-primary"
                          : "border-accent text-accent-foreground"
                      )}
                    >
                      {item.type}
                    </Badge>
                  </button>
                ))}
                {filteredSearchResults.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No results found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Watchlist Header */}
      <div className="bg-card rounded-t-xl rounded-b-none border border-border shadow-sm p-3 relative" ref={watchlistRef}>
        <button
          className="flex items-center gap-2 w-full text-left"
          onClick={() => setWatchlistOpen(!watchlistOpen)}
        >
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="font-medium text-sm">{selectedWatchlist}</span>
          {watchlistOpen ? (
            <ChevronUp className="w-4 h-4 text-warning ml-auto" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
          )}
        </button>

        {/* Watchlist Dropdown */}
        {watchlistOpen && (
          <div className="absolute left-0 right-0 top-full z-50 bg-card border border-b-0 rounded-b-lg shadow-lg">
            <div className="max-h-[300px] overflow-auto">
              {watchlistOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleSelectWatchlist(option.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors text-left",
                    selectedWatchlist === option.name && "bg-muted/30"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    selectedWatchlist === option.name && "text-primary"
                  )}>
                    {option.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{option.stockCount} stocks</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border border-t-0 h-[500px]">
        {/* Watchlist Tabs */}
        <div className="p-3 border-b border-border flex gap-1">
          {watchlistTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded text-xs font-medium border transition-colors",
                activeTab === tab
                  ? "border-success text-success bg-success/10"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Watchlist Items */}
        <div className="flex-1 overflow-auto">
          {watchlistItems.map((item) => (
            <div
              key={item.symbol}
              className="px-3 py-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => navigate(`/stock/${item.symbol}`)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{item.name ?? item.symbol}</span>
                  <span className="text-xs text-muted-foreground mt-1">{item.exchange}</span>
                </div>

                <div className="text-right">
                  <p className={cn("text-sm tabular-nums font-medium", item.change >= 0 ? 'text-success' : 'text-destructive')}>
                    {item.price.toLocaleString()}
                  </p>
                  <p className={cn(
                    "text-xs tabular-nums flex items-center justify-end gap-1 mt-1",
                    item.change >= 0 ? "text-success" : "text-destructive"
                  )}>
                    <span className="text-[10px] leading-none">{item.change >= 0 ? '▲' : '▼'}</span>
                    <span>{Math.abs(item.change).toFixed(2)} ({Math.abs(item.changePercent).toFixed(2)}%)</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-3 bg-card border border-border border-t-0 flex items-center gap-3 text-xs text-muted-foreground">
        <span>Name</span>
        <span>LTP</span>
        <span>LTP %</span>
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </div>
      </div>
    </aside>
  );
}
