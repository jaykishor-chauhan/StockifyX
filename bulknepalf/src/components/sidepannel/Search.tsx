import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, X, Clock, Plus, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';


type RecentSearchItem = {
    name: string;
    securityName?: string;
    ltp?: number;
    change?: number;
    changePercent?: number;
    sector?: string;
};

type WatchListStoredItem = {
    symbol: string;
    name: string;
    securityName?: string;
    sector?: string;
};

const RECENT_SEARCHES_KEY = 'recentSearches';
const WATCHLIST_KEY = 'watchList';

const seedRecentSearches: RecentSearchItem[] = [];


export default function Search() {
    const navigate = useNavigate();
    const { liveTicker } = useAuth();
    const listedRows = liveTicker?.listedCompany ?? [];
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => {
        try {
            const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            return Array.isArray(parsed) ? parsed : seedRecentSearches;
        } catch {
            return seedRecentSearches;
        }
    });
    const [watchlist, setWatchlist] = useState<string[]>(() => {
        try {
            const raw = localStorage.getItem(WATCHLIST_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(parsed)) return [];
            return parsed
                .map((it: any) => (typeof it?.symbol === 'string' ? it.symbol : ''))
                .filter(Boolean);
        } catch {
            return [];
        }
    });

    const addRecentSearch = (item: RecentSearchItem) => {
        const sym = (item.name || '').split(' ')[0]?.toUpperCase?.() ?? '';
        if (!sym) return;

        setRecentSearches((prev) => {
            const without = prev.filter(
                (p) => ((p.name || '').split(' ')[0]?.toUpperCase?.() ?? '') !== sym
            );
            const next = [item, ...without].slice(0, 8);
            try {
                localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
            } catch { }
            return next;
        });
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        try {
            localStorage.removeItem(RECENT_SEARCHES_KEY);
        } catch { }
    };

    const toggleWatchlist = (symbol: string, data: Omit<WatchListStoredItem, 'symbol'>) => {
        const sym = (symbol || '').toUpperCase();
        if (!sym) return;

        setWatchlist((prev) => {
            const exists = prev.includes(sym);
            const nextSyms = exists ? prev.filter((s) => s !== sym) : [sym, ...prev];

            try {
                const raw = localStorage.getItem(WATCHLIST_KEY);
                const parsed = raw ? JSON.parse(raw) : [];
                const prevItems: WatchListStoredItem[] = Array.isArray(parsed) ? parsed : [];

                const nextItems = exists
                    ? prevItems.filter((it) => (it?.symbol || '').toUpperCase() !== sym)
                    : [{ symbol: sym, ...data }, ...prevItems.filter((it) => (it?.symbol || '').toUpperCase() !== sym)];

                localStorage.setItem(WATCHLIST_KEY, JSON.stringify(nextItems.slice(0, 50)));
            } catch { }

            return nextSyms;
        });
    };

    const searchRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target as Node)
            ) {
                setSearchFocused(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on ESC
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setSearchFocused(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const q = searchQuery.trim().toLowerCase();

    const filteredSearchResults = recentSearches.filter((item) => {
        if (!q) return true;
        return (
            (item.name || '').toLowerCase().includes(q) ||
            (item.sector || '').toLowerCase().includes(q) ||
            (item.securityName || '').toLowerCase().includes(q)
        );
    });

    const filteredListedRows = q
        ? listedRows
            .filter((it) =>
                (it.name || '').toLowerCase().includes(q) ||
                (it.sector || '').toLowerCase().includes(q) ||
                (it.securityName || '').toLowerCase().includes(q)
            )
            .slice(0, 20)
        : [];

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div
            ref={searchRef}
            className="bg-card ml-8 mb-4 rounded-xl shadow-sm relative"
        >
            {/* Input */}
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

                {/* Search Icon */}
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                {/* Clear Button */}
                {(searchQuery || searchFocused) && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Overlay */}
            {searchFocused && (
                <div className="absolute top-full z-50 w-full bg-card border border-border rounded-b-lg shadow-lg max-h-[70vh] overflow-auto">

                    {/* Recent Searches */}
                    <div className="">
                        <div className="flex items-center justify-between mb-2 px-3 pt-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-primary">
                                    Recent Searches
                                </span>
                            </div>
                            <button
                                onClick={clearRecentSearches}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                Clear
                            </button>
                        </div>

                        {filteredSearchResults.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No recent searches
                            </p>
                        )}

                        {filteredSearchResults.map((item, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center justify-between px-2 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 text-left"
                                onClick={() => {
                                    const sym =
                                        item.name.split(' ')[0].toUpperCase();
                                    addRecentSearch(item);
                                    setSearchFocused(false);
                                    setSearchQuery(item.securityName || item.name);
                                    navigate(`/stock/${sym}`);
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <Star className="w-4 h-4 text-warning fill-warning" />
                                    <div>
                                        <span className="text-sm font-medium" title={item.securityName}>
                                            {item.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-right flex items-center justify-end gap-2">

                                    {/* LTP */}
                                    <div className="text-sm tabular-nums font-medium">
                                        {item.ltp?.toFixed?.(2) ?? '-'}
                                    </div>

                                    {/* Change + % */}
                                    <div
                                        className={cn(
                                            "text-xs tabular-nums",
                                            (item.change ?? 0) >= 0 ? 'text-success' : 'text-destructive'
                                        )}
                                    >
                                        {(item.change ?? 0) >= 0 ? '+' : ''}
                                        {item.change?.toFixed?.(2) ?? '-'}
                                        ({item.changePercent?.toFixed?.(2) ?? '-'}%)
                                    </div>

                                </div>


                            </button>
                        ))}

                        {/* Listed Companies (from liveTicker) */}
                        {q && (
                            <div className="mt-3">
                                <div className="space-y-0">
                                    {filteredListedRows.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No results found
                                        </p>
                                    )}

                                    {filteredListedRows.map((item, idx) => {
                                            const sym = (item.name || '').split(' ')[0].toUpperCase();
                                            const inWatch = watchlist.includes(sym);
                                            return (
                                                <div
                                                    key={idx}
                                                    className="w-full flex items-center justify-between px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/50"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            toggleWatchlist(sym, {
                                                                name: item.name,
                                                                securityName: item.securityName,
                                                                sector: item.sector,
                                                            })
                                                        }
                                                        className={cn(
                                                            "w-7 h-7 flex items-center justify-center mr-2 text-sm",
                                                            inWatch
                                                                ? "border-success text-success"
                                                                : "border-border text-muted-foreground hover:bg-muted"
                                                        )}
                                                        title={`${inWatch ? 'Remove from' : 'Add to'} watchlist`}
                                                        aria-label={inWatch ? 'Remove from watchlist' : 'Add to watchlist'}
                                                    >
                                                        {inWatch ? (
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        ) : (
                                                            <Plus className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            addRecentSearch({
                                                                name: item.name,
                                                                securityName: item.securityName,
                                                                ltp: item.ltp,
                                                                sector: item.sector,
                                                                change: item.change,
                                                                changePercent: item.changePercent,
                                                            });
                                                            setSearchFocused(false);
                                                            setSearchQuery(item.securityName || item.name);
                                                            navigate(`/stock/${sym}`);
                                                        }}
                                                        className="flex-1 text-left"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-shrink-0">
                                                                <img src={`${import.meta.env.VITE_IMGURL}/${item.iconUrl}`} alt={item.securityName} className="w-6 h-6 rounded-full" />
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-medium">{item.name}</span>
                                                                <span className="text-xs text-muted-foreground ml-2">{(item.sector || '').length > 10 ? `${(item.sector || '').slice(0, 10)}...` : item.sector}</span>
                                                                {item.securityName ? (
                                                                    <span className="text-xs text-muted-foreground block mt-0.5">
                                                                        {(item.securityName || '').length > 20 ? `${(item.securityName || '').slice(0, 20)}...` : item.securityName}
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </button>

                                                    <div className="text-right">
                                                        <div className="text-sm tabular-nums font-medium">{item.ltp?.toFixed?.(2) ?? '-'}</div>
                                                        <div className={cn("text-xs tabular-nums mt-1", (item.change ?? 0) >= 0 ? 'text-success' : 'text-destructive')}>
                                                            {(item.change ?? 0) >= 0 ? '+' : ''}{item.change?.toFixed?.(2) ?? '-'} ({item.changePercent?.toFixed?.(2) ?? '-'}%)
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
