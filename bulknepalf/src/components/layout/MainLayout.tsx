import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LeftSidebar } from './LeftSidebar';
import { useAuth } from '@/contexts/AuthContext';

export function MainLayout() {
  const { marketStatus, liveTicker, primaryIndex } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar only */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={false}
        onToggleCollapse={() => {}}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          marketStatus={marketStatus}
          liveTicker={liveTicker}
          primaryIndex={primaryIndex}
        />

        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
