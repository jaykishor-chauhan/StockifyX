import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

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

type StoredWatchListItem = {
    symbol: string;
    name: string;
    securityName?: string;
    sector?: string;
};

const WATCHLIST_KEY = 'watchList';

export default function WatchList() {
    const navigate = useNavigate();
    const { liveTicker } = useAuth();
    const indices = liveTicker?.index ?? [];
    const subIndices = liveTicker?.subIndex ?? [];
    const listedCompanies = liveTicker?.listedCompany ?? [];
    const [watchlistOpen, setWatchlistOpen] = useState(false);
    const [selectedWatchlist, setSelectedWatchlist] = useState('Watchlist');

    const [sortKey, setSortKey] = useState<'name' | 'ltp' | 'ltpPercent'>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const [storedWatchList, setStoredWatchList] = useState<StoredWatchListItem[]>(() => {
        try {
            const raw = localStorage.getItem(WATCHLIST_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

    const isIndices = selectedWatchlist === 'Indices';
    const isSubIndices = selectedWatchlist === 'Sub Indices';
    const isWatchlist = selectedWatchlist === 'Watchlist';

    const getSym = (name?: string) => (name || '').split(' ')[0].toUpperCase();
    const findCompanyTicker = (sym: string) => listedCompanies.find((it) => getSym(it.name) === sym);

    const watchlistOptions: WatchlistOption[] = [
        { name: 'Watchlist', stockCount: storedWatchList.length },
        { name: 'Indices', stockCount: indices.length },
        { name: 'Sub Indices', stockCount: subIndices.length },
    ];

    const displayedItems: WatchlistItem[] = isIndices
        ? indices.map((it) => ({
            symbol: getSym(it.name),
            name: it.name,
            price: it.ltp ?? 0,
            change: it.change ?? 0,
            changePercent: it.changePercent ?? 0,
            exchange: 'NEPSE',
            type: 'INDEX',
        }))
        : isSubIndices
            ? subIndices.map((it) => ({
                symbol: getSym(it.name),
                name: it.name,
                price: it.ltp ?? 0,
                change: it.change ?? 0,
                changePercent: it.changePercent ?? 0,
                exchange: 'NEPSE',
                type: 'SUB_INDEX',
            }))
            : isWatchlist
                ? storedWatchList.map((it) => {
                    const symbol = (it.symbol).toUpperCase();
                    const ticker = findCompanyTicker(symbol);
                    return {
                        symbol: symbol,
                        name: it.securityName,
                        price: ticker?.ltp ?? 0,
                        change: ticker?.change ?? 0,
                        changePercent: ticker?.changePercent ?? 0,
                        exchange: it.sector ?? 'NEPSE',
                        type: 'STOCK',
                    };
                })
                : [];

    const toggleSort = (key: 'name' | 'ltp' | 'ltpPercent') => {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
            return;
        }

        setSortKey(key);
        setSortDir('asc');
    };

    const sortedItems = [...displayedItems].sort((a, b) => {
        const dir = sortDir === 'asc' ? 1 : -1;

        if (sortKey === 'name') {
            return dir * (a.symbol || '').localeCompare(b.symbol || '');
        }

        if (sortKey === 'ltp') {
            return dir * ((a.price ?? 0) - (b.price ?? 0));
        }

        return dir * ((a.changePercent ?? 0) - (b.changePercent ?? 0));
    });

    const watchlistRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                watchlistRef.current &&
                !watchlistRef.current.contains(e.target as Node)
            ) {
                setWatchlistOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keep in sync with localStorage (e.g., when Search panel updates the watchList)
    useEffect(() => {
        try {
            const raw = localStorage.getItem(WATCHLIST_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            setStoredWatchList(Array.isArray(parsed) ? parsed : []);
        } catch {
            setStoredWatchList([]);
        }
    }, [watchlistOpen]);

    const handleSelectWatchlist = (name: string) => {
        setSelectedWatchlist(name);
        setWatchlistOpen(false);
    };

    return (
        <>
            {/* Watchlist Header */}
            <div
                className="bg-card rounded-t-xl border border-border shadow-sm p-3 relative"
                ref={watchlistRef}
            >
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
                    <div className="absolute left-0 right-0 top-full z-50 bg-card border border-border rounded-b-lg shadow-lg">
                        <div className="max-h-[300px] overflow-auto">
                            {watchlistOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={() => handleSelectWatchlist(option.name)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-3 border-b border-border last:border-b-0 hover:bg-muted/50 text-left",
                                        selectedWatchlist === option.name && "bg-muted/30"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "text-sm font-medium",
                                            selectedWatchlist === option.name && "text-primary"
                                        )}
                                    >
                                        {option.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {option.stockCount} stocks
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Watchlist Body */}
            <div className="bg-card border border-t-0 h-[500px] overflow-auto">
                {/* Items */}
                {sortedItems.map((item) => (
                    <div
                        key={item.symbol}
                        className="px-3 py-3 border-b border-border hover:bg-muted/50 cursor-pointer"
                        onClick={() => navigate(`/stock/${item.symbol}`)}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="font-medium text-sm">
                                    {item.symbol}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                                    {item.name}
                                </div>

                            </div>

                            <div className="text-right">
                                <div
                                    className={cn(
                                        "text-sm font-medium tabular-nums",
                                        item.change >= 0
                                            ? "text-success"
                                            : "text-destructive"
                                    )}
                                >
                                    {item.price.toLocaleString()}
                                </div>
                                <div
                                    className={cn(
                                        "text-xs tabular-nums mt-1",
                                        item.change >= 0
                                            ? "text-success"
                                            : "text-destructive"
                                    )}
                                >
                                    {item.change >= 0 ? '▲' : '▼'}{' '}
                                    {Math.abs(item.change).toFixed(2)} (
                                    {Math.abs(item.changePercent).toFixed(2)}%)
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Controls */}
            <div className="p-3 bg-card border border-border border-t-0 flex items-center gap-3 text-xs text-muted-foreground">
                <button
                    type="button"
                    onClick={() => toggleSort('name')}
                    className={cn(
                        'flex items-center gap-1 hover:text-foreground',
                        sortKey === 'name' && 'text-foreground'
                    )}
                >
                    <span>Name</span>
                    {sortKey === 'name' &&
                        (sortDir === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                        ) : (
                            <ChevronDown className="h-3 w-3" />
                        ))}
                </button>

                <button
                    type="button"
                    onClick={() => toggleSort('ltp')}
                    className={cn(
                        'flex items-center gap-1 hover:text-foreground',
                        sortKey === 'ltp' && 'text-foreground'
                    )}
                >
                    <span>LTP</span>
                    {sortKey === 'ltp' &&
                        (sortDir === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                        ) : (
                            <ChevronDown className="h-3 w-3" />
                        ))}
                </button>

                <button
                    type="button"
                    onClick={() => toggleSort('ltpPercent')}
                    className={cn(
                        'flex items-center gap-1 hover:text-foreground',
                        sortKey === 'ltpPercent' && 'text-foreground'
                    )}
                >
                    <span>LTP %</span>
                    {sortKey === 'ltpPercent' &&
                        (sortDir === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                        ) : (
                            <ChevronDown className="h-3 w-3" />
                        ))}
                </button>
            </div>
        </>
    );
}
