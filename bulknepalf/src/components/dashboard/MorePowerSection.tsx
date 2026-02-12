import { Monitor, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PowerItem {
  title: string;
  description: string;
  gradient: string;
}

const powerItems: PowerItem[] = [
  {
    title: 'ScanX',
    description: 'Filter, spot, and trade opportunities from one platform!',
    gradient: 'from-blue-900/80 to-blue-800/50',
  },
  {
    title: 'Options Trader',
    description: "Designed specially for India's F&O traders",
    gradient: 'from-purple-900/80 to-purple-800/50',
  },
  {
    title: 'DhanHQ APIs',
    description: 'Trade with algorithms, connect with apps, with FREE APIs',
    gradient: 'from-emerald-900/80 to-emerald-800/50',
  },
];

export function MorePowerSection() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
        <h3 className="text-base font-semibold mb-5">More Power to you</h3>

        <div className="grid grid-cols-3 gap-4">
          {powerItems.map((item) => (
            <div
              key={item.title}
              className={`p-5 rounded-xl bg-gradient-to-br ${item.gradient} border border-border hover:border-primary/30 transition-all cursor-pointer group`}
            >
              <h4 className="font-bold text-sm mb-1.5 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop App CTA */}
      <div className="flex items-center gap-3 px-5 py-3 bg-card rounded-xl border border-border shadow-sm">
        <Monitor className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Dhan Desktop App</span>
        <Button variant="outline" size="sm" className="h-7 text-xs ml-2 gap-1.5 rounded-full">
          <Download className="w-3 h-3" />
          Get
        </Button>
      </div>

      {/* Footer tagline */}
      <div className="text-center py-6">
        <p className="text-2xl font-bold text-muted-foreground/40">#made_for_trade</p>
        <p className="text-sm text-muted-foreground/40 mt-1">
          built with ❤️ in India
        </p>
      </div>
    </div>
  );
}
