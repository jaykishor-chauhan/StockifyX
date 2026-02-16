import { cn } from '@/lib/utils';
import Search from '../sidepannel/Search';
import WatchList from '../sidepannel/WatchList';

export function SidePannel() {
  return (
    <aside className={cn("mt-6 space-x-8 flex-shrink-0 hidden lg:flex flex-col transition-all duration-300 w-80", "xl:w-96", "2xl:w-[400px]")}>
      {/* Search */}
      <Search />
        {/* Watchlist */}
      <WatchList />
    </aside>
  );
}
