import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import MarketPage from "./pages/MarketPage";
import IPOPage from "./pages/IPOPage";
import WatchlistPage from "./pages/WatchlistPage";
import NewsPage from "./pages/NewsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/Login";
import StockDetailPage from "./pages/StockDetailPage";
import IPOPipelinePage from "./pages/IPOPipelinePage";
import BulkTransactionsPage from "./pages/BulkTransactionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/ipo" element={<IPOPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/portfolio" element={<Dashboard />} />
              <Route path="/holdings" element={<Dashboard />} />
              <Route path="/stocks" element={<MarketPage />} />
              <Route path="/alerts" element={<NewsPage />} />
              <Route path="/stock/:symbol" element={<StockDetailPage />} />
              <Route path="/ipo-pipeline" element={<IPOPipelinePage />} />
              <Route path="/bulk-transactions" element={<BulkTransactionsPage />} />
              <Route path="/help" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
