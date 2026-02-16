import { ChevronDown, ChevronUp, Loader2, TrendingDown, TrendingUp } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatChange, formatCompactNumber, formatNumber, formatPercent, getChangeBgColor, getChangeColor } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const getIconSrc = (iconUrl: string | null | undefined) => {
    if (!iconUrl) return null;
    if (/^https?:\/\//i.test(iconUrl)) return iconUrl;

    const base = import.meta.env.VITE_IMGURL as string | undefined;
    if (!base) return iconUrl;

    const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
    const normalizedPath = iconUrl.startsWith("/") ? iconUrl.slice(1) : iconUrl;
    return `${normalizedBase}/${normalizedPath}`;
};

const toFiniteNumber = (value: unknown) => {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
};

export default function ListedCompany() {
    const { listedCompany, loading } = useAuth();

    type SortKey = "ltp" | "ch" | "chp" | "vol" | "turnover" | null;
    type SortDir = "asc" | "desc";

    const [sortKey, setSortKey] = useState<SortKey>(null);
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const [activeSector, setActiveSector] = useState<string>("All");

    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const sectors = useMemo(() => {
        const set = new Set<string>();
        for (const item of listedCompany) {
            const sector = typeof item?.sector === "string" ? item.sector.trim() : "";
            set.add(sector.length > 0 ? sector : "Other");
        }
        const values = Array.from(set);
        values.sort((a, b) => a.localeCompare(b));
        return ["All", ...values];
    }, [listedCompany]);

    useEffect(() => {
        setActiveSector((prev) => (sectors.includes(prev) ? prev : "All"));
    }, [sectors]);

    const filteredRows = useMemo(() => {
        if (activeSector === "All") return listedCompany;
        return listedCompany.filter((item) => {
            const sector = typeof item?.sector === "string" ? item.sector.trim() : "";
            const normalized = sector.length > 0 ? sector : "Other";
            return normalized === activeSector;
        });
    }, [activeSector, listedCompany]);

    const totalRows = filteredRows.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

    useEffect(() => {
        setCurrentPage((prev) => Math.min(Math.max(1, prev), totalPages));
    }, [totalPages]);

    const sortedRows = useMemo(() => {
        if (!sortKey) return filteredRows;

        const rows = [...filteredRows];
        const getVal = (row: (typeof listedCompany)[number]) => {
            if (sortKey === "ltp") return toFiniteNumber(row.lastTradedPrice);
            if (sortKey === "ch") return toFiniteNumber(row.change);
            if (sortKey === "chp") return toFiniteNumber(row.percentageChange);
            if (sortKey === "vol") return toFiniteNumber(row.totalTradeQuantity);
            return toFiniteNumber(row.totalTradeValue);
        };

        rows.sort((a, b) => {
            const av = getVal(a);
            const bv = getVal(b);
            if (av === bv) return 0;
            return sortDir === "asc" ? av - bv : bv - av;
        });

        return rows;
    }, [filteredRows, sortDir, sortKey]);

    const pagedRows = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedRows.slice(start, start + rowsPerPage);
    }, [currentPage, sortedRows]);

    const toggleSort = (key: Exclude<SortKey, null>) => {
        setCurrentPage(1);
        setSortKey((prev) => {
            if (prev !== key) {
                setSortDir("desc");
                return key;
            }
            setSortDir((d) => (d === "desc" ? "asc" : "desc"));
            return prev;
        });
    };

    const SortIcon = ({ active }: { active: boolean }) => {
        if (!active) return <ChevronDown className="h-4 w-4 opacity-30" />;
        return sortDir === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
    };

    return (
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <h3 className="text-base font-semibold mb-4">Listed Companies</h3>

            {/* Sector Tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
                {sectors.map((sector) => (
                    <button
                        type="button"
                        key={sector}
                        onClick={() => {
                            setActiveSector(sector);
                            setCurrentPage(1);
                        }}
                        className={cn(
                            "inline-flex relative z-10 px-3.5 py-1.5 items-center text-xs font-medium rounded-sm border whitespace-nowrap transition-all duration-200",
                            activeSector === sector
                                ? "bg-success/10 border-success text-success"
                                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                    >
                        {sector}
                    </button>
                ))}
            </div>

            <div className="w-full overflow-x-auto">
                <div className="min-w-[1100px]">
                    {/* Table Header (grid-style like IPOs) */}
                    <div className="grid grid-cols-[2.5fr_1fr_1fr_1.3fr_1fr_1fr_1fr_1fr_1.3fr_0.8fr_1fr] gap-3 px-2 py-3 text-xs font-semibold uppercase text-muted-foreground border-b border-border">
                        <span className="flex items-center gap-1">Symbol</span>
                        <button
                            type="button"
                            onClick={() => toggleSort("ltp")}
                            className={cn(
                                "inline-flex items-center gap-1 w-fit select-none",
                                sortKey === "ltp" ? "text-foreground" : "text-muted-foreground",
                            )}
                            aria-label="Sort by LTP"
                        >
                            LTP
                            <SortIcon active={sortKey === "ltp"} />
                        </button>

                        <button
                            type="button"
                            onClick={() => toggleSort("ch")}
                            className={cn(
                                "inline-flex items-center gap-1 w-fit select-none",
                                sortKey === "ch" ? "text-foreground" : "text-muted-foreground",
                            )}
                            aria-label="Sort by change"
                        >
                            CH
                            <SortIcon active={sortKey === "ch"} />
                        </button>

                        <button
                            type="button"
                            onClick={() => toggleSort("chp")}
                            className={cn(
                                "inline-flex items-center gap-1 w-fit select-none",
                                sortKey === "chp" ? "text-foreground" : "text-muted-foreground",
                            )}
                            aria-label="Sort by change percent"
                        >
                            CH%
                            <SortIcon active={sortKey === "chp"} />
                        </button>
                        <span>OPEN</span>
                        <span>HIGH</span>
                        <span>LOW</span>

                        <button
                            type="button"
                            onClick={() => toggleSort("vol")}
                            className={cn(
                                "inline-flex items-center gap-1 w-fit select-none",
                                sortKey === "vol" ? "text-foreground" : "text-muted-foreground",
                            )}
                            aria-label="Sort by volume"
                        >
                            VOL.
                            <SortIcon active={sortKey === "vol"} />
                        </button>

                        <button
                            type="button"
                            onClick={() => toggleSort("turnover")}
                            className={cn(
                                "inline-flex items-center gap-1 w-fit select-none",
                                sortKey === "turnover" ? "text-foreground" : "text-muted-foreground",
                            )}
                            aria-label="Sort by turnover"
                        >
                            TURNOVER
                            <SortIcon active={sortKey === "turnover"} />
                        </button>
                        <span>LTV</span>
                        <span>PR. CLOSE</span>
                    </div>

                    <div className="space-y-1">
                        {loading && listedCompany.length === 0 ? (
                            <div className="py-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading listed companies...
                            </div>
                        ) : totalRows === 0 ? (
                            <div className="py-10 text-center text-sm text-muted-foreground">No listed company data available.</div>
                        ) : (
                            pagedRows.map((item) => {
                                const change = toFiniteNumber(item.change);
                                const changePercent = toFiniteNumber(item.percentageChange);
                                const isUp = change > 0;
                                const isDown = change < 0;

                                return (
                                    <div
                                        key={`${item.symbol}-${item.securityId}`}
                                        className={cn(
                                            "grid grid-cols-[2.5fr_1fr_1fr_1.3fr_1fr_1fr_1fr_1fr_1.3fr_0.8fr_1fr] gap-3 items-center px-2 py-3 transition-colors text-sm",
                                            getChangeBgColor(change),
                                            change > 0
                                                ? "hover:bg-success/15"
                                                : change < 0
                                                    ? "hover:bg-destructive/15"
                                                    : "hover:bg-muted/50",
                                        )}
                                    >
                                        <span className="font-semibold inline-flex items-center gap-2 min-w-0">
                                            <Avatar className="h-10 w-10 rounded-md">
                                                <AvatarImage src={`${import.meta.env.VITE_IMGURL}/${item.iconUrl}`} alt={item.symbol} className="object-contain" />
                                                <AvatarFallback className="rounded-lg text-xs">
                                                    {(item.symbol || "?").slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="min-w-0">
                                                <span className="block text-primary leading-5 truncate">{item.symbol}</span>
                                                <span className="block text-xs text-muted-foreground truncate max-w-[260px]">{item.securityName}</span>
                                            </span>
                                        </span>

                                        <span className="tabular-nums">{formatNumber(item.lastTradedPrice, 1)}</span>

                                        <span className={cn("tabular-nums", getChangeColor(change))}>
                                            {formatChange(change)}
                                        </span>

                                        <span>
                                            <span
                                                className={cn(
                                                    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 tabular-nums w-fit min-w-[120px]",
                                                    getChangeBgColor(change),
                                                    getChangeColor(change),
                                                )}
                                            >
                                                {isUp ? (
                                                    <TrendingUp className="h-4 w-4" />
                                                ) : isDown ? (
                                                    <TrendingDown className="h-4 w-4" />
                                                ) : null}
                                                {formatPercent(changePercent).replace("+", "")}
                                            </span>
                                        </span>

                                        <span className="tabular-nums">{formatNumber(item.openPrice, 0)}</span>
                                        <span className="tabular-nums">{formatNumber(item.highPrice, 1)}</span>
                                        <span className="tabular-nums">{formatNumber(item.lowPrice, 1)}</span>

                                        <span className="tabular-nums">{formatCompactNumber(item.totalTradeQuantity)}</span>
                                        <span className="tabular-nums">{formatCompactNumber(item.totalTradeValue)}</span>
                                        <span className="tabular-nums">{formatNumber(item.lastTradedVolume, 0)}</span>
                                        <span className="tabular-nums">{formatNumber(item.previousClose, 1)}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {listedCompany.length > 0 ? (
                <div className="flex items-center justify-between gap-3 pt-4 mt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                        {loading
                            ? "Loading..."
                            : totalRows > 0
                                ? `Showing ${Math.min((currentPage - 1) * rowsPerPage + 1, totalRows)}-${Math.min(currentPage * rowsPerPage, totalRows)} of ${totalRows}`
                                : ""}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={loading || currentPage <= 1}
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
                            disabled={loading || currentPage >= totalPages}
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}