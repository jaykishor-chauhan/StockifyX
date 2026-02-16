import { Currency, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const portfolioTabs = ['All', 'Stocks', 'Mutual Fund', 'ETFs', 'Smallcases'];


export default function PortfolioIndex() {
    const [showValue, setShowValue] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    // Format currency
    const formatCurrency = (amount: number) => {
        return `${amount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    // Reusable Currency Component
    const Currency = ({ amount }: { amount: number }) => {
        if (!showValue) return <>रू •••••</>;
        return <>{formatCurrency(amount)}</>;
    };
    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-6">
                    <h2 className="text-base font-semibold">My Portfolio</h2>
                    <div className="flex gap-1 bg-muted/50 rounded-full p-1">
                        {portfolioTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200',
                                    activeTab === tab
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Toggle Visibility */}
                <button
                    onClick={() => setShowValue(!showValue)}
                    className="p-1.5 hover:bg-muted rounded-md transition-colors"
                >
                    {showValue ? (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                    ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                </button>
            </div>
            {/* Portfolio Stats Grid */}
            <div className="grid grid-cols-4 gap-8 mb-5">
                <div>
                    <p className="text-xs text-primary font-medium mb-1.5">Investment</p>
                    <p className="text-xl font-bold tabular-nums">
                        <Currency amount={0} />
                    </p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Current Value</p>
                    <p className="text-xl font-bold tabular-nums">
                        <Currency amount={0} />
                    </p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Overall Profits</p>
                    <p className="text-xl font-bold tabular-nums">
                        {showValue ? (
                            <>
                                <Currency amount={0} />{' '}
                                <span className="text-sm font-normal text-muted-foreground">
                                    (0.00%)
                                </span>
                            </>
                        ) : (
                            'रू •••••'
                        )}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground mb-1.5">Today's Profit</p>
                    <p className="text-xl font-bold tabular-nums">
                        {showValue ? (
                            <>
                                <Currency amount={0} />{' '}
                                <span className="text-sm font-normal text-muted-foreground">
                                    (0.00%)
                                </span>
                            </>
                        ) : (
                            'रू •••••'
                        )}
                    </p>
                </div>
            </div>
            {/* Secondary Stats Row */}
            <div className="flex items-center gap-8 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Today's P&amp;L:
                    </span>
                    <span className="text-sm font-semibold tabular-nums">
                        <Currency amount={0} />
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-sm text-muted-foreground">
                        Open Positions:
                    </span>
                    <span className="text-sm font-semibold">0</span>
                    <span className="text-muted-foreground text-sm">›</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Margin Available:
                    </span>
                    <span className="text-sm font-semibold tabular-nums">
                        <Currency amount={0} />
                    </span>
                </div>
                {/* Balance & Top Up */}
                <div className="flex items-center gap-3 ml-auto">
                    <div className="px-4 py-2 bg-muted/50 rounded-lg border border-border">
                        <span className="text-sm font-semibold tabular-nums">
                            <Currency amount={50000} />
                        </span>
                    </div>
                    <Button className="h-9 px-4 bg-success hover:bg-success/90 text-white font-medium shadow-sm">
                        <Plus className="w-4 h-4 mr-1.5" />
                        Top Up
                    </Button>
                </div>
            </div>
        </div>
    );
}