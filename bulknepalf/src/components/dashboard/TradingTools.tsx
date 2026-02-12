import { Zap, Grid3X3, Bell, LineChart, Settings, BookOpen } from 'lucide-react';

interface Tool {
  icon: React.ReactNode;
  name: string;
}

const tools: Tool[] = [
  { icon: <Zap className="w-5 h-5 text-primary" />, name: 'Power Scalper' },
  { icon: <Grid3X3 className="w-5 h-5 text-muted-foreground" />, name: 'Advanced Option Chain' },
  { icon: <Bell className="w-5 h-5 text-warning" />, name: 'Price Alerts' },
  { icon: <LineChart className="w-5 h-5 text-primary" />, name: 'TradingView Webhook' },
  { icon: <Settings className="w-5 h-5 text-success" />, name: "Trader's Controls" },
  { icon: <BookOpen className="w-5 h-5 text-warning" />, name: "Trader's Diary" },
];

export function TradingTools() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <h3 className="text-base font-semibold mb-5">Trading Tools by Dhan</h3>

      <div className="grid grid-cols-3 gap-3">
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
  );
}
