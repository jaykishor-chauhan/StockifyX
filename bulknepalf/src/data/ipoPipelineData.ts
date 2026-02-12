export interface IPOPipelineItem {
  symbol: string;
  name: string;
  sector?: string;
  units: number;
  price: number;
  amounts: number;
  openingDate?: string;
  closingDate?: string;
  applicationDate?: string;
  sebonDate?: string;
  status: string;
  issueManager?: string;
  category: string;
}

export const ipoPipelineData: IPOPipelineItem[] = [
  // IPO
  { symbol: 'HFIL', name: 'Hotel Forest Inn Limited', sector: 'Hotel & Tourism', units: 3320000, price: 100, amounts: 332000000, openingDate: '2026-02-05', closingDate: '2026-02-09', applicationDate: '2026-02-05', sebonDate: '2026-02-05', status: 'Open', issueManager: 'NIC Asia Capital', category: 'IPO' },
  { symbol: 'SKHL', name: 'Super Khudi Hydropower Limited', sector: 'Hydro Power', units: 1286500, price: 100, amounts: 128650000, openingDate: '2026-02-16', closingDate: '2026-02-22', applicationDate: '2026-02-16', sebonDate: '2026-02-16', status: 'ComingSoon', issueManager: 'Global IME Capital', category: 'IPO' },
  { symbol: 'RIDGE', name: 'Ridge Line Energy Limited', sector: 'Hydro Power', units: 1180260, price: 100, amounts: 118026000, openingDate: '2026-02-11', closingDate: '2026-02-16', applicationDate: '2026-02-11', sebonDate: '2026-02-11', status: 'ComingSoon', issueManager: 'Prabhu Capital', category: 'IPO' },
  { symbol: 'SRL', name: 'Snow Rivers Limited', units: 1875000, price: 100, amounts: 187500000, status: 'ComingSoon', issueManager: 'Sanima Capital', category: 'IPO' },
  { symbol: 'APPOLO', name: 'Appolo Hydropower Limited', units: 1410000, price: 100, amounts: 141000000, status: 'ComingSoon', issueManager: 'Prabhu Capital', category: 'IPO' },
  { symbol: 'KHPL', name: 'Kalinchowk Hydropower Limited', sector: 'Hydro Power', units: 1375000, price: 100, amounts: 137500000, status: 'ComingSoon', issueManager: 'RBB Merchant Banking', category: 'IPO' },
  { symbol: 'PCIL', name: 'Palpa Cements Industries Private Li...', units: 7500000, price: 100, amounts: 750000000, status: 'ComingSoon', issueManager: 'Sanima Cap...', category: 'IPO' },
  { symbol: 'SPDPL', name: 'Shikhar Power Development Limited', units: 3200000, price: 100, amounts: 320000000, status: 'ComingSoon', issueManager: 'NIBL Capital', category: 'IPO' },
  { symbol: 'SKHEL', name: 'Suryakunda Hydro Electric Limited', units: 572431, price: 100, amounts: 57243100, openingDate: '2026-02-01', closingDate: '2026-02-04', status: 'Closed', issueManager: 'Siddhartha Capital', category: 'IPO' },
  { symbol: 'BJHL', name: 'Bhujung Hydropower Limited', units: 830000, price: 100, amounts: 83000000, openingDate: '2026-01-26', closingDate: '2026-01-29', status: 'Closed', issueManager: 'Muktinath Capital', category: 'IPO' },
  // IPO Local
  { symbol: 'SPDPL', name: 'Shikhar Power Development Limited', units: 980000, price: 100, amounts: 98000000, openingDate: '2026-01-20', closingDate: '2026-02-04', status: 'Closed', issueManager: 'NIBL Capital', category: 'IPO Local' },
  { symbol: 'PCIL', name: 'Palpa Cement Industries Limited', units: 1875000, price: 100, amounts: 187500000, openingDate: '2026-01-09', closingDate: '2026-01-25', status: 'Closed', issueManager: 'Sanima Cap...', category: 'IPO Local' },
  { symbol: 'SKHL', name: 'Super Khudi Hydropower Limited', sector: 'Hydro Power', units: 1550000, price: 100, amounts: 155000000, openingDate: '2026-01-06', closingDate: '2026-01-22', status: 'Closed', issueManager: 'Global IME Capital', category: 'IPO Local' },
  { symbol: 'RIDGE', name: 'Ridge Line Energy Limited', units: 1185000, price: 100, amounts: 118500000, openingDate: '2025-12-28', closingDate: '2026-01-12', status: 'Closed', issueManager: 'Prabhu Capital', category: 'IPO Local' },
  { symbol: 'SKHEL', name: 'Suryakunda Hydro Electric Limited', units: 689675, price: 100, amounts: 68967500, openingDate: '2025-12-24', closingDate: '2026-01-07', status: 'Closed', issueManager: 'Siddhartha Capital', category: 'IPO Local' },
  { symbol: 'BJHL', name: 'Bhujung Hydropower Limited', units: 1000000, price: 100, amounts: 100000000, openingDate: '2025-12-18', closingDate: '2026-01-01', status: 'Closed', issueManager: 'Muktinath Capital', category: 'IPO Local' },
  { symbol: 'SOLU', name: 'Solu Hydropower Limited', units: 10000000, price: 100, amounts: 1000000000, openingDate: '2025-11-23', closingDate: '2025-12-07', status: 'Closed', issueManager: 'NIC Asia Capital', category: 'IPO Local' },
  { symbol: 'SYPNL', name: 'SY Panel Nepal Limited', units: 261627, price: 100, amounts: 26162700, openingDate: '2025-09-23', closingDate: '2025-10-07', status: 'Closed', issueManager: 'Prabhu Capital', category: 'IPO Local' },
  { symbol: 'SAIL', name: 'Shreenagar Agritech Industries Limi...', units: 163125, price: 100, amounts: 16312500, openingDate: '2025-08-27', closingDate: '2025-09-16', status: 'Closed', issueManager: 'Sanima Capital', category: 'IPO Local' },
  { symbol: 'JHAPA', name: 'Jhapa Energy Limited', units: 380190, price: 100, amounts: 38019000, openingDate: '2025-07-30', closingDate: '2025-08-13', status: 'Closed', issueManager: 'Muktinath Capital', category: 'IPO Local' },
  // IPO Foreign Employment
  { symbol: 'AKAMA', name: 'Akama Hotel Limited', sector: 'Hotel & Tourism', units: 4500000, price: 100, amounts: 225000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Sanima Cap...', category: 'IPO Foreign Employment' },
  { symbol: 'TPHSL', name: 'Thamel Plaza Hotel &...', sector: 'Hotel & Tourism', units: 1000000, price: 100, amounts: 100000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Nepal SBI ...', category: 'IPO Foreign Employment' },
  // Right Share
  { symbol: 'GBBL', name: 'Garima Bikas Bank Limited', units: 5000000, price: 100, amounts: 500000000, status: 'ComingSoon', issueManager: 'NIC Asia Capital', category: 'Right Share' },
  { symbol: 'PCBL', name: 'Prime Commercial Bank Ltd', units: 3000000, price: 100, amounts: 300000000, status: 'ComingSoon', issueManager: 'NIBL Capital', category: 'Right Share' },
  // FPO
  { symbol: 'NLIC', name: 'Nepal Life Insurance Company Ltd', units: 2000000, price: 100, amounts: 200000000, status: 'ComingSoon', issueManager: 'Siddhartha Capital', category: 'FPO' },
  // Mutual Funds
  { symbol: 'NIBLPF', name: 'NIBL Pragati Fund', units: 5000000, price: 10, amounts: 50000000, applicationDate: '2025-03-15', sebonDate: '2025-03-15', status: 'ComingSoon', issueManager: 'NIBL Capital', category: 'Mutual Funds' },
  { symbol: 'GBIMCF', name: 'Global IME Samunnat Fund', units: 10000000, price: 10, amounts: 100000000, applicationDate: '2025-04-01', sebonDate: '2025-04-01', status: 'ComingSoon', issueManager: 'Global IME Capital', category: 'Mutual Funds' },
  // Debentures
  { symbol: 'AKAMA', name: 'Akama Hotel Limited', sector: 'Hotel & Tourism', units: 4500000, price: 100, amounts: 225000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Sanima Cap...', category: 'Debentures' },
  { symbol: 'TPHSL', name: 'Thamel Plaza Hotel &...', sector: 'Hotel & Tourism', units: 1000000, price: 100, amounts: 100000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Nepal SBI ...', category: 'Debentures' },
  { symbol: 'KHPL', name: 'Kalinchowk Hydropowe...', sector: 'Hydro Power', units: 750000, price: 100, amounts: 75000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'RBB Mercha...', category: 'Debentures' },
  { symbol: 'BLHL', name: 'Bungal Hydro Limited', units: 2905000, price: 100, amounts: 290500000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Himalayan ...', category: 'Debentures' },
  { symbol: 'SGHL', name: 'Sanigad Hydro Limite...', units: 8550000, price: 100, amounts: 855000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'LS Capital...', category: 'Debentures' },
  { symbol: 'PENL', name: 'Peoples Energy Limit...', units: 6600000, price: 100, amounts: 660000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Sanima Cap...', category: 'Debentures' },
  { symbol: 'CDCL', name: 'Chhaya Devi Complex ...', units: 1437500, price: 100, amounts: 575000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Prabhu Cap...', category: 'Debentures' },
  { symbol: 'BIGIL', name: 'Business Interest Gr...', units: 4500000, price: 100, amounts: 450000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Kumari Cap...', category: 'Debentures' },
  { symbol: 'SHLTD', name: 'Shivam Holdings Limi...', units: 11600000, price: 100, amounts: 2436000000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Siddhartha...', category: 'Debentures' },
  { symbol: 'KHSL', name: 'Kailash Helicopter S...', units: 350000, price: 100, amounts: 114450000, applicationDate: '2025-04-06', sebonDate: '2025-04-06', status: 'ComingSoon', issueManager: 'Muktinath ...', category: 'Debentures' },
];
