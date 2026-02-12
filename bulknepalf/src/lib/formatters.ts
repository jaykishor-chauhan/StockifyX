// Utility functions for formatting numbers and dates

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-NP', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCompactNumber(num: number): string {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + ' Kha';
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + ' Ar';
  }
  if (num >= 1e7) {
    return (num / 1e7).toFixed(2) + ' Cr';
  }
  if (num >= 1e5) {
    return (num / 1e5).toFixed(2) + ' L';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + ' K';
  }
  return num.toFixed(2);
}

export function formatCurrency(num: number): string {
  return `Rs. ${formatNumber(num)}`;
}

export function formatPercent(num: number): string {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
}

export function formatChange(num: number): string {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${formatNumber(num)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-NP', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(dateString: string): string {
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return formatDate(dateString);
}

export function getChangeColor(change: number): string {
  if (change > 0) return 'text-success';
  if (change < 0) return 'text-destructive';
  return 'text-muted-foreground';
}

export function getChangeBgColor(change: number): string {
  if (change > 0) return 'bg-success/10';
  if (change < 0) return 'bg-destructive/10';
  return 'bg-muted';
}
