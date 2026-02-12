import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { newsData, announcementData } from '@/data/mockData';
import { NewsCard, AnnouncementItem } from '@/components/market/NewsCard';
import { Newspaper, Bell, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NewsPage() {
  return (
    <div className="section-padding py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            News & Announcements
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with the latest market news and company announcements
          </p>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="news">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="news" className="flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            Market News
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((post, i) => (
              <NewsCard key={post.id} post={post} delay={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Latest Announcements</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {announcementData.map((announcement) => (
                <AnnouncementItem key={announcement.id} announcement={announcement} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
