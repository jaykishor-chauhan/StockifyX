export interface BulkTransactionRow {
  symbol: string;
  name: string;
  type: 'Buy' | 'Sell';
  openPrice: number;
  closePrice: number;
  avgPrice: number;
  changePercent: number;
  quantity: number;
  amount: number;
  trade: number;
  brokerId: number;
  lastTransactionTime: string;
}

export const bulkTransactionsMock: BulkTransactionRow[] = [
  { symbol: 'API', name: 'API Power Company Ltd', type: 'Buy', openPrice: 303, closePrice: 303, avgPrice: 303, changePercent: 0, quantity: 500, amount: 151500, trade: 3, brokerId: 1, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'AVYAN', name: 'Avyan Finance Limited', type: 'Buy', openPrice: 949.4, closePrice: 958, avgPrice: 952.66, changePercent: 0.91, quantity: 70, amount: 66686, trade: 6, brokerId: 32, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'NYADI', name: 'Nyadi Hydropower Limited', type: 'Sell', openPrice: 405, closePrice: 405, avgPrice: 405, changePercent: 0, quantity: 566, amount: 229230, trade: 2, brokerId: 39, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'ACLBSL', name: 'Aarambha Chautari Laghubitta', type: 'Sell', openPrice: 965, closePrice: 960, avgPrice: 964.16, changePercent: -0.52, quantity: 600, amount: 578498, trade: 3, brokerId: 11, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'RADHI', name: 'Radhi Bidyut Company Ltd', type: 'Buy', openPrice: 875, closePrice: 875, avgPrice: 875, changePercent: 0, quantity: 678, amount: 593250, trade: 4, brokerId: 82, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'MEHL', name: 'Modi Energy Hydro Limited', type: 'Sell', openPrice: 450, closePrice: 450, avgPrice: 450, changePercent: 0, quantity: 500, amount: 225000, trade: 4, brokerId: 1, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'SYPNL', name: 'SY Panel Nepal Limited', type: 'Buy', openPrice: 2115, closePrice: 2115, avgPrice: 2115, changePercent: 0, quantity: 500, amount: 1057500, trade: 26, brokerId: 28, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'TVCL', name: 'Trishuli Jal Vidhyut Company Limited', type: 'Buy', openPrice: 563, closePrice: 575, avgPrice: 570.87, changePercent: 2.13, quantity: 7000, amount: 3996058, trade: 54, brokerId: 14, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'BHCL', name: 'Bhotekoshi Hydropower Company', type: 'Buy', openPrice: 607, closePrice: 609, avgPrice: 607.85, changePercent: 0.33, quantity: 500, amount: 303924, trade: 6, brokerId: 16, lastTransactionTime: '2026-02-05, 2:59:59 PM' },
  { symbol: 'NRN', name: 'NRN Infrastructure Development', type: 'Buy', openPrice: 1580, closePrice: 1647, avgPrice: 1620.5, changePercent: 5.24, quantity: 1200, amount: 1944600, trade: 18, brokerId: 5, lastTransactionTime: '2026-02-05, 2:58:30 PM' },
  { symbol: 'UNHPL', name: 'Union Hydropower Limited', type: 'Sell', openPrice: 510, closePrice: 531, avgPrice: 525.3, changePercent: 6.84, quantity: 800, amount: 420240, trade: 12, brokerId: 22, lastTransactionTime: '2026-02-05, 2:57:45 PM' },
  { symbol: 'KDL', name: 'Kalinchowk Darshan Limited', type: 'Buy', openPrice: 980, closePrice: 1078.1, avgPrice: 1030.5, changePercent: 10, quantity: 450, amount: 463725, trade: 8, brokerId: 44, lastTransactionTime: '2026-02-05, 2:55:20 PM' },
];
