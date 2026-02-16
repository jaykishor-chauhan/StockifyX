import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { LiveTicker, LiveTickerItem, MarketStatus, PrimaryIndex, TopStocks, TopStockItem, MarketSummary, IPOs, ListedCompany } from "@/types/market";

interface AuthContextType {
  loading: boolean;
  error: string | null;
  marketStatus: MarketStatus | null;
  primaryIndex: PrimaryIndex | null;
  liveTicker: LiveTicker | null;
  topStocks: TopStocks | null;
  marketSummary: MarketSummary | null;
  fetchIPOs: (pageSize: number, type: number, forValue: number) => Promise<void>; // Function to fetch IPOs details (no return)
  ipoList: IPOs | null; // State to hold fetched IPOs details
  listedCompany: ListedCompany[]; // State to hold listed company details
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [primaryIndex, setPrimaryIndex] = useState<PrimaryIndex | null>(null);
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);
  const [liveTicker, setLiveTicker] = useState<LiveTicker | null>(null);
  const [topStocks, setTopStocks] = useState<TopStocks | null>(null);
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ipoList, setIpoList] = useState<IPOs | null>(null);
  const [listedCompany, setListedCompany] = useState<ListedCompany[]>([]);

  /*** Utility function to safely convert a value to a finite number. */
  const toFiniteNumber = (value: unknown) => {
    const numberValue = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numberValue) ? numberValue : 0;
  };

  /*** Utility function to convert raw API response items into LiveTickerItem format. */
  const toTickerItem = (item: any): LiveTickerItem => {
    const ltp = toFiniteNumber(item?.lastTradedPrice ?? item?.ltp ?? item?.currentValue);
    const change = toFiniteNumber(item?.change);

    const providedChangePercent =
      item?.changePercent ??
      item?.percentageChange ??
      item?.percentChange ?? 0

    return {
      name:
        typeof item?.name === "string" && item.name.length > 0
          ? item.name.length > 6
            ? (typeof item?.symbol === "string" ? item.symbol : item.name)
            : item.name
          : (typeof item?.symbol === "string" ? item.symbol : ""),
      securityName: typeof item?.securityName === "string" ? item.securityName : item?.name,
      iconUrl: item?.iconUrl ?? item?.icon ?? "",
      sector: typeof item?.sector === "string" ? item.sector : "",
      ltp,
      change,
      changePercent: providedChangePercent,
    };
  };
  const mapTickers = (value: unknown): LiveTickerItem[] => {
    return Array.isArray(value) ? value.map(toTickerItem) : [];
  };

  /*** Functon to convert raw API response items into TopStockItem format, with an additional category field. */
  const toTopStock = (item: any, category?: string): TopStockItem => {
    return {
      index: category ?? "",
      script: item?.symbol,
      name: item?.name,
      ltp: toFiniteNumber(item?.lastTradedPrice),
      change: toFiniteNumber(item?.change),
      changePercent: toFiniteNumber(item?.changePercent),
      turnover: item?.turnover ? toFiniteNumber(item?.turnover) : 0,
      tradedQty: item?.sharesTraded ? toFiniteNumber(item?.sharesTraded) : 0,
      icon: item?.icon ?? "",
    };
  };
  const mapTopStocks = (category: string, value: unknown): TopStockItem[] => {
    if (!Array.isArray(value)) return [];
    return value.map((item: any) => toTopStock(item, category));
  };

  /*** Fetch market status from API and update state. */
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const marketStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/bulknepal/api/v1/nepselive/market/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch market status");
        }

        const payload = data?.data ?? data;

        if (payload?.updatedAt == null) {
          throw new Error("Unexpected market status response (missing updatedAt)");
        }

        setMarketStatus({
          isOpen: typeof payload.isOpen === "string" ? payload.isOpen === "OPEN" : Boolean(payload.isOpen),
          updatedAt: payload.updatedAt,
        });

        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    // Initial call
    marketStatus();

    // Poll every 1 second
    intervalId = setInterval(marketStatus, 10000);

    // Cleanup on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  /*** Fetch live market data from API and update state and it includes primary index, market summary, live ticker, and top stocks of HomePage.*/
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const liveMarketData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/bulknepal/api/v1/nepselive/market/indices`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok || data.success === false) {
          setError(data.message || "Failed to fetch live market data");
          throw new Error(data.message || "Failed to fetch live market data");
        }

        const liveMarketData = data?.data ?? data;

        const nepse = liveMarketData?.indices?.find(
          (index) => index.name === "NEPSE"
        );
        if (nepse) {
          setPrimaryIndex({
            name: nepse.name,
            value: toFiniteNumber(nepse.currentValue),
            change: toFiniteNumber(nepse.change),
            changePercent: toFiniteNumber(nepse.changePercent),
          });
        }

        // marketSummary is expected to be an array of items
        setMarketSummary(Array.isArray(liveMarketData?.marketSummary) ? liveMarketData.marketSummary : []);

        // console.log("Live Market Data (summary):", liveMarketData?.marketSummary);

        setLiveTicker({
          index: mapTickers(liveMarketData?.indices),
          subIndex: mapTickers(liveMarketData?.subIndices),
          listedCompany: mapTickers(liveMarketData?.liveCompanyData ?? liveMarketData?.listedCompanies),
          topGainer: mapTickers(liveMarketData?.topGainers),
          topLoser: mapTickers(liveMarketData?.topLosers),
          topTraded: mapTickers(liveMarketData?.topTradedShares ?? liveMarketData?.topTraded),
          topTransaction: mapTickers(liveMarketData?.topTransactions ?? liveMarketData?.topTransaction),
          topTurnover: mapTickers(liveMarketData?.topTurnover),
        });

        setTopStocks({
          topGainers: mapTopStocks("topGainers", liveMarketData?.topGainers),
          topLosers: mapTopStocks("topLosers", liveMarketData?.topLosers),
          topTraded: mapTopStocks("topTraded", liveMarketData?.topTraded),
          topTurnover: mapTopStocks("topTurnover", liveMarketData?.topTurnover),
        });

        setListedCompany(liveMarketData?.listedCompanies ?? []);

        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    // Initial call
    liveMarketData();

    // Poll every 10 seconds
    intervalId = setInterval(liveMarketData, 10000);

    // Cleanup on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  /*** Fetch IPOs details form API */
  const fetchIPOs = async (pageSize: number, type: number, forValue: number): Promise<void> => {
    /**
     * General -> pageSize=500, type=0, for=2
     * Local -> pageSize=500, type=0, for=0
     * Foreign Employees -> pageSize=500, type=1, for=1
     * Right Share -> pageSize=500, type=2, for=2
     * FPO -> pageSize=500, type=1, for=2
     * Mutual Funds -> pageSize=500, type=3, for=2
     * Debentures -> pageSize=500, type=4, for=2
     */

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/bulknepal/api/v1/cdsc/application/open/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageSize: pageSize,
          type: type,
          forValue: forValue,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        setError(data.message || "Failed to fetch IPOs details");
        return;
      }

      const content = data?.data ?? [];
      const iposData: IPOs = { items: Array.isArray(content) ? content : [] };
      setIpoList(iposData);

      // console.log("Raw IPOs API Response:", iposData.items);

      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      return;
    }

  };


  return (
    <AuthContext.Provider value={{ marketStatus, liveTicker, primaryIndex, topStocks, marketSummary, loading, error, fetchIPOs, ipoList, listedCompany }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook (recommended usage)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
