import { Bell, Menu, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Pause, Play, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavLink } from '@/components/NavLink';
import { formatNumber } from '@/lib/formatters';
import { useState, useRef, useEffect } from 'react';
import type { LiveTicker, MarketStatus, PrimaryIndex } from '@/types/market';

interface HeaderProps {
  onMenuClick: () => void;
  marketStatus: MarketStatus | null;
  liveTicker: LiveTicker | null;
  primaryIndex: PrimaryIndex | null;
}

export function Header({ onMenuClick, marketStatus, liveTicker, primaryIndex }: HeaderProps) {
  const [tickerExpanded, setTickerExpanded] = useState(true);
  const [tickerPlaying, setTickerPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const STORAGE_KEY = 'bn:ticker-categories';
  const [visibleCategories, setVisibleCategories] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { }
    return ['index', 'subIndex'];
  });
  const tickerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [menuCoords, setMenuCoords] = useState<{ left: number; top: number } | null>(null);


  /**
   * Ticker scroll effect: When ticker is playing, we use requestAnimationFrame to create a smooth scrolling effect by continuously updating the scrollLeft position of the ticker container.
   */
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker || !tickerPlaying || !tickerExpanded) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const speed = 0.5; // px per frame
    const scroll = () => {
      scrollPosRef.current += speed;
      if (ticker.scrollWidth > 0 && scrollPosRef.current >= ticker.scrollWidth / 2) {
        scrollPosRef.current = 0;
      }
      ticker.scrollLeft = scrollPosRef.current;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [tickerPlaying, tickerExpanded]);

  /**
   * Close the category selection menu when clicking outside of it. 
  */
  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  /**
   * CATEGORY_LIST defines the different categories of market data that can be displayed in the ticker, 
   * along with their corresponding keys in the LiveTicker data structure.
   */
  const CATEGORY_LIST: { key: keyof LiveTicker; label: string }[] = [
    { key: 'index', label: 'Index' },
    { key: 'subIndex', label: 'Sub Index' },
    { key: 'listedCompany', label: 'Listed Company' },
    { key: 'topGainer', label: 'Top Gainer' },
    { key: 'topLoser', label: 'Top Loser' },
    { key: 'topTraded', label: 'Top Trade' },
    { key: 'topTransaction', label: 'Top Transaction' },
    { key: 'topTurnover', label: 'Top Turnover' },
  ];

  const toggleCategory = (key: string) => {
    setVisibleCategories((prev) => {
      if (prev.includes(key)) {
        // prevent removing the last selected category
        if (prev.length <= 1) return prev;
        return prev.filter((k) => k !== key);
      }
      return [...prev, key];
    });
  };
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleCategories));
    } catch (e) { }
  }, [visibleCategories]);

  /**
   * buildDynamicTicker constructs a unified list of ticker items to be displayed in the scrolling ticker, 
   * based on the currently visible categories and the liveTicker data. 
   */
  const buildDynamicTicker = () => {
    const out: { name: string; value: number; change: number; changePercent: number }[] = [];
    if (!liveTicker) return out;
    for (const key of visibleCategories) {
      const items = (liveTicker as any)[key] as any[] | undefined;
      if (!Array.isArray(items)) continue;
      for (const it of items) {
        out.push({
          name: it?.name ?? it?.symbol ?? '',
          value: typeof it?.ltp === 'number' ? it.ltp : (typeof it?.currentValue === 'number' ? it.currentValue : (typeof it?.price === 'number' ? it.price : 0)),
          change: typeof it?.change === 'number' ? it.change : 0,
          changePercent: typeof it?.changePercentage === 'number' ? it.changePercentage : (typeof it?.changePercent === 'number' ? it.changePercent : 0),
        });
      }
    }
    return out;
  };
  const dynamicTicker = buildDynamicTicker();
  const itemsForScroll = dynamicTicker.length ? [...dynamicTicker, ...dynamicTicker] : [];


  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border">
      {/* Main Header Row */}
      <div className="h-14 flex items-center justify-between px-4 lg:px-6">
        {/* Left Section - Logo + Primary Index */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Logo (clickable) */}
            <button
              type="button"
              // onClick={() => navigate('/admin/portfolio')}
              className="flex items-center gap-3 focus:outline-none"
              aria-label="Go to dashboard"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                <img
                  src="/StockifyX.png"
                  alt="StockifyX logo"
                  className="w-full h-full object-cover"
                  draggable
                  onDragStart={(e) => {
                    const url = window.location.href;
                    try {
                      e.dataTransfer.setData('text/uri-list', url);
                    } catch { }
                    e.dataTransfer.setData('text/plain', url);
                    e.dataTransfer.effectAllowed = 'copyLink';
                  }}
                />
              </div>
              {/* <span className="text-xl font-bold text-foreground">StockifyX</span> */}
            </button>

            {/* Primary Index */}
            <NavLink to="/market" className="flex items-center gap-2 px-2 py-1 rounded hover:bg-secondary/50 transition-colors">
              <span className="text-sm font-medium text-foreground">{primaryIndex?.name}</span>
              <span className="text-sm font-medium tabular-nums">{formatNumber(primaryIndex?.value ?? 0)}</span>
              <span className={`flex items-center gap-0.5 text-sm font-medium ${(primaryIndex?.change ?? 0) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {(primaryIndex?.change ?? 0) >= 0 ? '+' : ''}{(primaryIndex?.change ?? 0).toFixed(2)} ({(primaryIndex?.changePercent ?? 0).toFixed(2)}%)
                {(primaryIndex?.change ?? 0) >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
              </span>
            </NavLink>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-success"
          >
            Home
          </NavLink>
          <NavLink
            to="/portfolio"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-success"
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/holdings"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-success"
          >
            Positions
          </NavLink>
          <NavLink
            to="/watchlist"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-success"
          >
            Orders
          </NavLink>
          <NavLink
            to="/settings"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-success"
          >
            Money
          </NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Secondary Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink
              to="/market"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Markets
            </NavLink>
            <NavLink
              to="/stocks"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              Stocks
            </NavLink>
            <NavLink
              to="/news"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              News
            </NavLink>
            <NavLink
              to="/ipo"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              IPOs
            </NavLink>
          </nav>

          {/* Market Status */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50">
            <div
              className={`w-2 h-2 rounded-full ${marketStatus?.isOpen ? 'market-open' : 'market-closed'
                }`}
            />
            <span className="text-xs font-medium text-muted-foreground">
              Markets {marketStatus?.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
            <span className="text-sm font-semibold text-primary-foreground">JC</span>
          </div>
        </div>
      </div>

      {/* Indices Ticker For all the listed stocks*/}
      <div className={`bg-background border-t border-border overflow-hidden transition-all duration-300 ${tickerExpanded ? 'h-10' : 'h-0'}`}>
        <div className="h-10 flex items-center">
          <div ref={tickerRef} className="flex-1 overflow-x-hidden h-10 flex items-center">
            <div className="flex items-center gap-6 min-w-max px-4 lg:px-6">
              {itemsForScroll.map((index, i) => (
                <div key={`${index.name}-${i}`} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{index.name}</span>
                  <span className="text-sm tabular-nums text-foreground">{formatNumber(index.value)}</span>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${index.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                    {index.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                  </span>
                  {i < itemsForScroll.length - 1 && (
                    <span className="text-border ml-4">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Play/Pause Button */}
          <div className="flex items-center gap-1 pr-1 flex-shrink-0">
            <button
              onClick={() => setTickerPlaying(!tickerPlaying)}
              className="h-7 w-7 flex items-center justify-center rounded bg-secondary hover:bg-secondary/80 transition-colors"
            >
              {tickerPlaying ? (
                <Pause className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <Play className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Three-dot vertical menu button + dropdown */}
          <div ref={menuRef} className="relative flex-shrink-0">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="More options"
              onMouseDown={(e) => {
                e.stopPropagation();
                // compute button position and open menu as fixed so it's not clipped by overflow-hidden parents
                const btn = menuButtonRef.current;
                if (btn) {
                  const rect = btn.getBoundingClientRect();
                  // position menu aligned to the right of the button
                  setMenuCoords({ left: rect.right - 192, top: rect.bottom + 6 });
                }
                setMenuOpen((s) => !s);
              }}
              className={`h-7 w-7 flex items-center justify-center rounded bg-secondary hover:bg-secondary/80 transition-colors mr-1 ${menuOpen ? 'ring-1 ring-border' : ''}`}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                style={menuCoords ? { position: 'fixed', left: `${menuCoords.left}px`, top: `${menuCoords.top}px` } : { position: 'fixed', right: '1rem', top: '4.5rem' }}
                className="w-48 bg-card border border-border rounded shadow-md p-2 z-50"
              >
                <div className="text-sm font-medium mb-2">Show in ticker</div>
                <div className="flex flex-col gap-1">
                  {CATEGORY_LIST.map((c) => (
                    <label key={String(c.key)} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={visibleCategories.includes(String(c.key))}
                        onChange={() => toggleCategory(String(c.key))}
                        className="h-4 w-4"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticker Toggle */}
      <button
        onClick={() => setTickerExpanded(!tickerExpanded)}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 bg-card border border-border rounded-full p-0.5 hover:bg-secondary transition-colors"
      >
        {tickerExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </header>
  );
}
