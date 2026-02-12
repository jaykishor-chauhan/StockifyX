import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post, Announcement } from '@/types/market';
import { formatDate, getTimeAgo } from '@/lib/formatters';
import { Newspaper, ExternalLink, CheckCircle, MessageSquare, Share2, Heart } from 'lucide-react';

interface NewsCardProps {
  post: Post;
  delay?: number;
}

export function NewsCard({ post, delay = 0 }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-card transition-all cursor-pointer group">
        {post.mediaUrl && (
          <div className="aspect-video bg-muted overflow-hidden">
            <img
              src={post.mediaUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.profileImageUrl}
              alt={post.profileName}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24';
              }}
            />
            <span className="text-sm font-medium">{post.profileName}</span>
            {post.isProfileVerified && (
              <CheckCircle className="w-4 h-4 text-primary fill-primary/20" />
            )}
            <span className="text-xs text-muted-foreground ml-auto">{post.timeAgo}</span>
          </div>
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.summary}</p>
          
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="w-4 h-4" />
              <span>{post.reactionCount}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>{post.commentCount}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
              <span>{post.shareCount}</span>
            </button>
            <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AnnouncementItemProps {
  announcement: Announcement;
}

export function AnnouncementItem({ announcement }: AnnouncementItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Newspaper className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium line-clamp-2">{announcement.title}</p>
        <div className="flex items-center gap-2 mt-1">
          {announcement.symbol !== 'N/A' && (
            <Badge variant="outline" className="text-xs">
              {announcement.symbol}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDate(announcement.announcementDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface NewsListProps {
  posts: Post[];
  title?: string;
}

export function NewsList({ posts, title = "Latest News" }: NewsListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <Badge variant="secondary">{posts.length} articles</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <NewsCard key={post.id} post={post} delay={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
