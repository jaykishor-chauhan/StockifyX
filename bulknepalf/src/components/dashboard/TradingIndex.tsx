
import { Zap, Grid3X3, Bell, LineChart, Settings, BookOpen } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Tool {
  icon: React.ReactNode;
  name: string;
}
const tools: Tool[] = [
  { icon: <Zap className="w-5 h-5 text-primary" />, name: 'Power' },
  { icon: <Grid3X3 className="w-5 h-5 text-muted-foreground" />, name: 'Advanced' },
  { icon: <Bell className="w-5 h-5 text-warning" />, name: 'Price Alerts' },
  { icon: <LineChart className="w-5 h-5 text-primary" />, name: 'Webhook' },
  { icon: <Settings className="w-5 h-5 text-success" />, name: "Controls" },
  { icon: <BookOpen className="w-5 h-5 text-warning" />, name: "Diary" },
];


export default function TradingIndex() {
  const { liveTicker, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'index' | 'subIndex'>('all');

  const isLoading = loading && !liveTicker;

  const indexRows = liveTicker?.index ?? [];
  const subIndexRows = liveTicker?.subIndex ?? [];

  const rows = useMemo(() => {
    if (activeTab === 'index') return indexRows;
    if (activeTab === 'subIndex') return subIndexRows;
    return [...indexRows, ...subIndexRows];
  }, [activeTab, indexRows, subIndexRows]);

  const formatNumber = (value: number) =>
    value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const initialIndexRow = indexRows[0];
  const initialSubIndexRow = subIndexRows[0];
  return (
    <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5 shadow-sm ">
      <h3 className="text-base font-semibold mb-5">Temporary Components</h3>

      <div className="grid grid-cols-2 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.name}
            className="flex items-center gap-3 p-3.5 hover:bg-muted/50 rounded-lg transition-colors text-left border border-border group"
          >
            {tool.icon}
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {tool.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}