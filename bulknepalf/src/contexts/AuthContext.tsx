import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { LiveTicker, LiveTickerItem, MarketStatus, PrimaryIndex } from "@/types/market";
import { set } from "date-fns";


interface AuthContextType {
  marketStatus: MarketStatus | null;
  liveTicker: LiveTicker | null;
  loading: boolean;
  error: string | null;
  primaryIndex: PrimaryIndex | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [primaryIndex, setPrimaryIndex] = useState<PrimaryIndex | null>(null);
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);
  const [liveTicker, setLiveTicker] = useState<LiveTicker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Utility function to safely convert a value to a finite number. 
   */
  const toFiniteNumber = (value: unknown) => {
    const numberValue = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numberValue) ? numberValue : 0;
  };
  /** 
   * Utility function to convert raw API response items into LiveTickerItem format. 
   */
  const toTickerItem = (item: any): LiveTickerItem => {
    return {
      name:
        typeof item?.name === "string" && item.name.length > 0
          ? item.name.length > 6
            ? (typeof item?.symbol === "string" ? item.symbol : item.name)
            : item.name
          : (typeof item?.symbol === "string" ? item.symbol : ""),
      sector: typeof item?.sector === "string" ? item.sector : "",
      ltp: toFiniteNumber(item?.change),
      change: toFiniteNumber(item?.change),
      changePercent: toFiniteNumber(item?.changePercent),
    };
  };

  const mapTickers = (value: unknown): LiveTickerItem[] => {
    return Array.isArray(value) ? value.map(toTickerItem) : [];
  };

  /**
   * Fetch market status from API and update state. 
   */
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


  /**
   * Fetch live market data from API and update state. This includes the primary index and various ticker categories.
   */
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

  return (
    <AuthContext.Provider value={{ marketStatus, liveTicker, primaryIndex, loading, error }}>
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
