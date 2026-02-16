import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, Clock, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "../ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function IPOs() {
    const { fetchIPOs, ipoList } = useAuth();
    const [activeTab, setActiveTab] = useState('general');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const rowsPerPage = 5;

    const formatDate = (value?: string | null) => {
        if (!value) return "-";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
    };

    const items = useMemo(() => {
        const list = Array.isArray(ipoList?.items) ? ipoList!.items : [];
        return list.filter((ipo) => {
            const hasAny = Boolean(
                ipo?.id ?? ipo?.symbol ?? ipo?.name ?? ipo?.openingDate ?? ipo?.closingDate ?? ipo?.units ?? ipo?.price,
            );
            const isOpen = ipo?.status === "Open";
            return hasAny && isOpen;
        });
    }, [ipoList]);

    const totalPages = Math.max(1, Math.ceil(items.length / rowsPerPage));

    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, items.length]);

    const pagedItems = useMemo(() => {
        const safePage = Math.min(Math.max(1, currentPage), totalPages);
        const start = (safePage - 1) * rowsPerPage;
        return items.slice(start, start + rowsPerPage);
    }, [items, currentPage, totalPages]);

    const getStatusMeta = (status?: string | null) => {
        switch (status) {
            case "Open":
                return { label: "Open", className: "bg-success/10 text-success" };
            case "ComingSoon":
                return { label: "Upcoming", className: "bg-primary/10 text-primary" };
            case "Closed":
                return { label: "Closed", className: "bg-muted text-muted-foreground" };
            default:
                return { label: "-", className: "bg-muted text-muted-foreground" };
        }
    };

    const categoryParams = {
        general: { pageSize: 500, type: 0, forValue: 2 },
        local: { pageSize: 500, type: 0, forValue: 0 },
        foreignEmployees: { pageSize: 500, type: 0, forValue: 1 },
        rightShare: { pageSize: 500, type: 2, forValue: 2 },
        fpo: { pageSize: 500, type: 1, forValue: 2 },
        mutualFunds: { pageSize: 500, type: 3, forValue: 2 },
        debentures: { pageSize: 500, type: 4, forValue: 2 },
    };

    const categoryLabels: Record<string, string> = {
        general: "General",
        local: "Local",
        foreignEmployees: "Foreign Employees",
        rightShare: "Right Share",
        fpo: "FPO",
        mutualFunds: "Mutual Funds",
        debentures: "Debentures",
    };

    const emptyMessage = `No open offerings available for ${categoryLabels[activeTab] ?? "this category"}.`;

    const IPOHandler = async () => {
        const params = categoryParams[activeTab] ?? categoryParams.general;
        setIsLoading(true);
        try {
            await fetchIPOs(params.pageSize, params.type, params.forValue);
        } catch (err: any) {
            toast.error('Failed to fetch IPOs for ' + activeTab + ': ' + (err?.message ?? 'Unknown error'));
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        IPOHandler();
    }, [activeTab]);

    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-base font-semibold mb-5">Open for Apply - IPOs</h3>

            <div className="flex flex-wrap gap-2 mb-4">
                {[
                    { key: 'general', label: 'General' },
                    { key: 'local', label: 'Local' },
                    { key: 'foreignEmployees', label: 'Foreign Employees' },
                    { key: 'rightShare', label: 'Right Share' },
                    { key: 'fpo', label: 'FPO' },
                    { key: 'mutualFunds', label: 'Mutual Funds' },
                    { key: 'debentures', label: 'Debentures' },
                ].map((c) => (
                    <button
                        type="button"
                        key={c.key}
                        onClick={() => setActiveTab(c.key)}
                        className={cn(
                            "inline-flex relative z-10 items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all duration-200",
                            activeTab === c.key
                                ? "border-success text-success bg-success/10"
                                : "border-border text-muted-foreground hover:bg-success/10 hover:text-success"
                        )}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr_1.5fr_1fr] gap-3 px-2 py-3 text-xs font-semibold uppercase text-muted-foreground border-b border-border">
                <span className="flex items-center gap-1">Symbol</span>
                <span>Company</span>
                <span>Units</span>
                <span>Price</span>
                <span>Opening Date</span>
                <span>Closing Date</span>
                <span>Status</span>
            </div>


            <div className="space-y-1">
                {isLoading ? (
                    <div className="py-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading IPOs...
                    </div>
                ) : pagedItems.length === 0 ? (
                    <div className="py-10 text-center text-sm text-muted-foreground">{emptyMessage}</div>
                ) : (
                    pagedItems.map((ipo, index) => (
                        <div
                            key={ipo?.id ?? `${ipo?.symbol ?? "ipo"}-${(currentPage - 1) * rowsPerPage + index}`}
                            className="grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr_1.5fr_1fr] gap-3 items-center px-2 py-3 hover:bg-muted/50 transition-colors text-sm"
                        >
                            <span className="font-semibold inline-flex items-center gap-2 min-w-0">
                                <Avatar className="h-6 w-6 rounded-md">
                                    <AvatarImage
                                        src={`${import.meta.env.VITE_IMGURL}/${ipo?.iconUrl}`}
                                        alt={ipo?.name || ipo?.symbol}
                                    />
                                    <AvatarFallback className="rounded-md text-[10px] font-semibold text-muted-foreground">
                                        {(ipo?.symbol || ipo?.name || "?").slice(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="truncate">{ipo?.symbol || "-"}</span>
                            </span>

                            <span className="font-medium truncate">
                                {ipo?.name || "-"}
                            </span>

                            <span>
                                {ipo?.units ?? "-"}
                            </span>

                            <span>
                                {ipo?.price != null ? `Rs ${ipo.price}` : "-"}
                            </span>

                            <span className="text-muted-foreground">
                                {formatDate(ipo?.openingDate)}
                            </span>

                            <span className="text-muted-foreground">
                                {formatDate(ipo?.closingDate)}
                            </span>

                            {(() => {
                                const meta = getStatusMeta(ipo?.status);
                                return (
                                    <span
                                        className={cn(
                                            "text-xs font-medium px-2 py-1 rounded-full w-fit",
                                            meta.className,
                                        )}
                                    >
                                        {meta.label}
                                    </span>
                                );
                            })()}
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 pt-4 mt-3">
                <div className="text-xs text-muted-foreground">
                    {isLoading
                        ? "Loading IPOs..."
                        : items.length > 0
                            ? `Showing ${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, items.length)} of ${items.length}`
                            : ""}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isLoading || currentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                        Prev
                    </Button>
                    <span className="text-xs text-muted-foreground min-w-[90px] text-center">
                        Page {Math.min(currentPage, totalPages)} of {totalPages}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isLoading || currentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                        Next
                    </Button>
                </div>
            </div>


            {/* Rent Stocks */}
            <div className="border-t border-border pt-4 mt-4">
                <button type="button" className="inline-flex relative z-10 items-center gap-3 p-2 -ml-2 w-full hover:bg-muted/50 rounded-lg transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-red-900/50 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-foreground" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Upcoming / Existing Issues</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
            </div>
        </div>
    )
}