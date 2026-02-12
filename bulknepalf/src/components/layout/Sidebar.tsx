import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  TrendingUp,
  PieChart,
  Briefcase,
  Star,
  BarChart3,
  FileText,
  Newspaper,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Bell,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  // { icon: TrendingUp, label: 'Market', path: '/market' },
  // { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
  // { icon: PieChart, label: 'Holdings', path: '/holdings' },
  // { icon: Star, label: 'Watchlist', path: '/watchlist' },
  // { icon: BarChart3, label: 'Stocks', path: '/stocks' },
  // { icon: FileText, label: 'IPO', path: '/ipo' },
  // { icon: Newspaper, label: 'News', path: '/news' },
  // { icon: Bell, label: 'Alerts', path: '/alerts' },
];

const bottomMenuItems = [
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
  { icon: LogOut, label: 'Logout', path: '/logout' },
];

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-lg text-sidebar-foreground"
            >
              Sharesanshar
            </motion.span>
          )}
        </motion.div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex text-sidebar-foreground"
          onClick={onToggleCollapse}
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-sidebar-foreground"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-11 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-primary font-medium",
                  isCollapsed && "justify-center px-2"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-sidebar-primary")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border py-4 px-2">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-primary",
                  isCollapsed && "justify-center px-2"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-sidebar border-r border-sidebar-border z-50 lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Hidden, navigation is in header */}
    </>
  );
}
