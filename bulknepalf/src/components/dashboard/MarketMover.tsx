import { Activity, BarChart3, ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { cn } from '@/lib/utils';
import { useAuth } from '../../contexts/AuthContext';


export default function MarketMover() {
    const { topStocks, loading } = useAuth();
    const [activeMoversTab, setActiveMoversTab] = useState<'topGainers' | 'topLosers' | 'topTurnover' | 'topTraded'>('topGainers');
    const marketMovers = topStocks ? topStocks[activeMoversTab === 'topGainers' ? 'topGainers' : activeMoversTab === 'topLosers' ? 'topLosers' : activeMoversTab === 'topTurnover' ? 'topTurnover' : 'topTraded'] : [];
    const isMoversLoading = loading && !topStocks;
    const moverIcon = (tab: 'topGainers' | 'topLosers' | 'topTraded' | 'topTurnover') => {
        if (tab === 'topGainers') return <TrendingUp className="w-4 h-4 text-success" />;
        if (tab === 'topLosers') return <TrendingDown className="w-4 h-4 text-destructive" />;
        if (tab === 'topTraded') return <Activity className="w-4 h-4 text-emerald-500" />;
        if (tab === 'topTurnover') return <BarChart3 className="w-4 h-4 text-primary" />;
    };

    const moverStyles = (tab: 'topGainers' | 'topLosers' | 'topTraded' | 'topTurnover') => {
        if (tab === 'topGainers') return { avatarBg: 'bg-green-100 dark:bg-green-900/50', buttonHover: 'hover:bg-green-100/50' };
        if (tab === 'topLosers') return { avatarBg: 'bg-red-100 dark:bg-red-900/50', buttonHover: 'hover:bg-red-100/50' };
        if (tab === 'topTraded') return { avatarBg: 'bg-emerald-100 dark:bg-emerald-900/50', buttonHover: 'hover:bg-emerald-100/50' };
        return { avatarBg: 'bg-primary/10 dark:bg-primary/20', buttonHover: 'hover:bg-primary/10' };
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return `${amount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };
    return (
        <div className="lg:col-span-2 bg-card rounded-xl  border border-border p-5 shadow-sm">
            <div className="">
                <h3 className="text-base font-semibold mb-5">Market Movers</h3>
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveMoversTab('topGainers')}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all duration-200",
                            activeMoversTab === 'topGainers'
                                ? "border-success text-success bg-success/10"
                                : "border-border text-muted-foreground hover:bg-success/10 hover:text-success"
                        )}
                    >
                        <TrendingUp className="w-3 h-3" />
                        Gainers
                    </button>
                    <button
                        onClick={() => setActiveMoversTab('topLosers')}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all duration-200",
                            activeMoversTab === 'topLosers'
                                ? "border-destructive text-destructive bg-destructive/10"
                                : "border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        )}
                    >
                        <TrendingDown className="w-3 h-3" />
                        Losers
                    </button>
                    <button
                        onClick={() => setActiveMoversTab('topTurnover')}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all duration-200",
                            activeMoversTab === 'topTurnover'
                                ? "border-primary text-primary bg-primary/10"
                                : "border-border text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        )}
                    >
                        <BarChart3 className="w-3 h-3" />
                        Volumes
                    </button>
                    <button
                        onClick={() => setActiveMoversTab('topTraded')}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all duration-200",
                            activeMoversTab === 'topTraded'
                                ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                                : "border-border text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500"
                        )}
                    >
                        <Activity className="w-3 h-3" />
                        Traded
                    </button>
                </div>
                {/* Movers List */}
                <div className="space-y-0">
                    {isMoversLoading ? (
                        <div className="-mx-5">
                            {/* Table header */}
                            <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr] items-center gap-3 px-5 py-2.5 text-xs uppercase text-muted-foreground border-b border-border">
                                <span>Symbol</span>
                               <span className="text-left ml-3">CH</span>
                                <span className="text-left ml-3">CH %</span>
                                <span className="text-right">LTP</span>
                            </div>

                            {/* Horizontal skeleton rows */}
                            <div className="animate-pulse">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-[2fr_1fr_1.2fr_1fr] items-center gap-3 px-5 py-3 border-b border-border"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-7 h-7 rounded-full bg-muted/40" />
                                            <div className="h-4 w-24 rounded bg-muted/40" />
                                        </div>

                                        <div className="flex justify-start">
                                            <div className="h-4 w-14 rounded bg-muted/40" />
                                        </div>

                                        <div className="flex justify-start">
                                            <div className="h-6 w-20 rounded-xl bg-muted/40" />
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="h-4 w-16 rounded bg-muted/40" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (!marketMovers || marketMovers.length === 0) ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
                            <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center mb-3">
                                {moverIcon(activeMoversTab)}
                            </div>
                            <p className="font-medium">No market movers available</p>
                            <p className="text-xs mt-1">
                                Try switching tabs or check Top {activeMoversTab.slice(3)}.
                            </p>
                        </div>
                    ) : (
                        <div className="-mx-5">
                            {/* Table header */}
                            <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr] items-center gap-3 px-5 py-2.5 text-xs uppercase text-muted-foreground border-b border-border">
                                <span>Symbol</span>
                                <span className="text-left ml-3">CH</span>
                                <span className="text-left ml-3">CH %</span>
                                <span className="text-right">LTP</span>
                            </div>

                            {/* Table rows */}
                            {marketMovers.map((mover, i) => {
                                const cardTooltip = [
                                    mover.tradedQty !== 0 && `Traded Qty: ${mover.tradedQty}`,
                                    mover.turnover !== 0 && `Turnover: Rs ${formatCurrency(mover.turnover)}`
                                ].filter(Boolean).join(' | ') || '';

                                const isUp = mover.change > 0;
                                const isDown = mover.change < 0;

                                return (
                                    <div
                                        key={i}
                                        className="group grid grid-cols-[2fr_1fr_1.2fr_1fr] items-center gap-3 px-5 py-3 border-b border-border cursor-pointer transition-colors hover:bg-muted/30"
                                        title={cardTooltip}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                                                <img
                                                    src={`${import.meta.env.VITE_IMGURL}/${mover.icon}`}
                                                    alt={mover.script || mover.name}
                                                    className="w-7 h-7 rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p
                                                    className="text-sm truncate group-hover:text-primary transition-colors"
                                                    title={mover.name}
                                                >
                                                    {mover.script}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={cn(
                                            "text-left text-sm tabular-nums",
                                            mover.change >= 0 ? "text-success" : "text-destructive",
                                        )}>
                                            {mover.change >= 0 ? "+" : ""}{mover.change.toFixed(2)}
                                        </div>

                                        <div className="text-left">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center justify-end gap-1 rounded-xl px-3 py-1 text-xs tabular-nums ",
                                                    isUp ? "bg-success/10 text-success" : isDown ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
                                                )}
                                            >
                                                {/* {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : null} */}
                                                {mover.changePercent >= 0 ? "+" : ""}{mover.changePercent.toFixed(2)}%
                                            </span>
                                        </div>

                                        <div className="text-right text-sm tabular-nums">
                                            {mover.ltp.toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* VIEW BUTTON */}
                <div className="bg-card">
                    {(() => {
                        const { avatarBg, buttonHover } = moverStyles(activeMoversTab);
                        return (
                            <button className={`w-full flex items-center justify-between text-sm cursor-pointer mt-4 transition-colors p-2 w-full ${buttonHover} rounded-lg`}>
                                {/* Left side */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg ${avatarBg} flex items-center justify-center`}>
                                        {moverIcon(activeMoversTab)}
                                    </div>
                                    <span className="text-sm font-medium">Top {activeMoversTab.slice(3)}</span>
                                </div>
                                {/* Right side */}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}