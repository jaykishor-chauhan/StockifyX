import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IPO } from '@/types/market';
import { formatNumber, formatDate, formatCompactNumber } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Building, ChevronRight, FileText, Search } from 'lucide-react';
import { useState } from 'react';
import { IPOResultPanel } from '@/components/ipo/IPOResultPanel';

interface IPOCardProps {
  ipo: IPO;
  delay?: number;
}

export function IPOCard({ ipo, delay = 0 }: IPOCardProps) {
  const getStatusColor = (status: IPO['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-success text-success-foreground';
      case 'ComingSoon':
        return 'bg-warning text-warning-foreground';
      case 'Closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: IPO['status']) => {
    switch (status) {
      case 'Open':
        return 'Open Now';
      case 'ComingSoon':
        return 'Coming Soon';
      case 'Closed':
        return 'Closed';
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      <Card className={cn(
        "overflow-hidden hover:shadow-card transition-all cursor-pointer group",
        ipo.status === 'Open' && "border-success/50"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{ipo.symbol}</span>
                <Badge className={getStatusColor(ipo.status)}>
                  {getStatusLabel(ipo.status)}
                </Badge>
              </div>
              <CardTitle className="text-base mt-1 line-clamp-1">{ipo.name}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-semibold">Rs. {ipo.price}</p>
            </div>
            <div className="p-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Units</p>
              <p className="font-semibold">{formatCompactNumber(ipo.units)}</p>
            </div>
          </div>

          {ipo.openingDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(ipo.openingDate)} - {ipo.closingDate ? formatDate(ipo.closingDate) : 'TBA'}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4" />
            <span className="truncate">{ipo.issueManager}</span>
          </div>

          <div className="flex gap-2 mt-2">
            {ipo.status === 'Open' && (
              <Button className="flex-1 group-hover:shadow-glow transition-shadow">
                Apply Now
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            <CheckResultButton />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CheckResultButton() {
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={(e) => { e.stopPropagation(); setPanelOpen(true); }}
      >
        <Search className="w-3 h-3 mr-1" />
        Check Result
      </Button>
      <IPOResultPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}

interface IPOListProps {
  ipos: IPO[];
  title: string;
  maxItems?: number;
}

export function IPOList({ ipos, title, maxItems = 5 }: IPOListProps) {
  const displayedIpos = maxItems ? ipos.slice(0, maxItems) : ipos;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <Badge variant="secondary">{ipos.length} IPOs</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedIpos.map((ipo, index) => (
            <IPOCard key={ipo.id} ipo={ipo} delay={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
