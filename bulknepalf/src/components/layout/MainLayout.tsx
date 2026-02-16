import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidePannel } from './SidePannel';
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
        onToggleCollapse={() => { }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          marketStatus={marketStatus}
          liveTicker={liveTicker}
          primaryIndex={primaryIndex}
        />

        <div className="flex h-screen overflow-hidden">
          <div className="fixed left-15 top-15 h-screen w-[500px]">
            <SidePannel />
          </div>
          <main className="flex-1 overflow-y-auto h-screen lg:ml-80 xl:ml-96 2xl:ml-[400px]">
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
}
