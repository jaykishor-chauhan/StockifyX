import { ChevronRight, BarChart2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";


export default function MarketSummary() {
    const { marketSummary } = useAuth();
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
            <h3 className="text-base font-semibold mb-5">Market Summary</h3>
            {/* Summary List */}
            {(marketSummary && marketSummary.length > 0) ? (
              <div className="space-y-1 mx-2 pb-4">
                {marketSummary.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group -mx-5 px-3 py-1.5 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs tabular-nums font-semibold">
                        {formatCurrency(item.value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center mb-3">
                  <BarChart2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="font-medium">No market summary available</p>
                <p className="text-xs mt-1">Try switching tabs or check live market.</p>
              </div>
            )}
            {/* VIEW LIVE MARKET BUTTON
            <div className="w-full flex items-center justify-between text-sm transition-colors p-2 hover:bg-primary/10 rounded-lg">
              <button className="w-full flex items-center justify-between text-sm cursor-pointer text-muted-foreground hover:text-primary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-lg">L</span>
                  </div>
                  <span className="text-sm font-medium">Live Market</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div> */}

          </div>
        </div>
    )
};