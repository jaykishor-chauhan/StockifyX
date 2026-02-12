import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IPOCard } from '@/components/market/IPOCard';
import { ipoData } from '@/data/mockData';
import { FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function IPOPage() {
  const openIpos = ipoData.filter(ipo => ipo.status === 'Open');
  const upcomingIpos = ipoData.filter(ipo => ipo.status === 'ComingSoon');
  const closedIpos = ipoData.filter(ipo => ipo.status === 'Closed');

  return (
    <div className="section-padding py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          IPO Center
        </h1>
        <p className="text-muted-foreground mt-1">
          Track Initial Public Offerings, Right Shares, and FPOs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 border-success/30 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{openIpos.length}</p>
                <p className="text-sm text-muted-foreground">Open Now</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 border-warning/30 bg-warning/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{upcomingIpos.length}</p>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <XCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{closedIpos.length}</p>
                <p className="text-sm text-muted-foreground">Recently Closed</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* IPO Tabs */}
      <Tabs defaultValue="open">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="open" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Open ({openIpos.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Upcoming ({upcomingIpos.length})
          </TabsTrigger>
          <TabsTrigger value="closed" className="flex items-center gap-2">
            Closed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-6">
          {openIpos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {openIpos.map((ipo, i) => (
                <IPOCard key={ipo.id} ipo={ipo} delay={i} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No IPOs are currently open</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingIpos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingIpos.map((ipo, i) => (
                <IPOCard key={ipo.id} ipo={ipo} delay={i} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No upcoming IPOs announced</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="closed" className="mt-6">
          <Card className="p-8 text-center">
            <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recently closed IPOs to display</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
