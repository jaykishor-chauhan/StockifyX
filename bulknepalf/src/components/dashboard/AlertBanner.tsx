import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export function AlertBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 rounded-lg p-4 flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">Impact of NSDL Issue</p>
        <p className="text-sm text-orange-600/80 dark:text-orange-300/70 mt-0.5 leading-relaxed">
          Stock payouts are delayed due to technical issues at depositories and clearing corporations. Selling BTST positions may lead to auctions, withdrawals from BTST trades may be impacted, and stocks bought on 4 & 5 Feb cannot be pledged.
        </p>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-md transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4 text-orange-500 dark:text-orange-400" />
      </button>
    </div>
  );
}
