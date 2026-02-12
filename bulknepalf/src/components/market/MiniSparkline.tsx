import { useMemo } from 'react';

interface MiniSparklineProps {
  data: { value: number }[];
  isPositive: boolean;
}

export function MiniSparkline({ data, isPositive }: MiniSparklineProps) {
  const pathData = useMemo(() => {
    if (!data || data.length < 2) return '';

    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const width = 96;
    const height = 48;
    const padding = 4;

    const points = values.map((value, index) => {
      const x = padding + (index / (values.length - 1)) * (width - 2 * padding);
      const y = padding + (1 - (value - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  }, [data]);

  const strokeColor = isPositive ? 'hsl(var(--chart-up))' : 'hsl(var(--chart-down))';
  const gradientId = `gradient-${isPositive ? 'up' : 'down'}`;

  if (!data || data.length < 2) return null;

  return (
    <svg width="96" height="48" className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={pathData + ` L 92,44 L 4,44 Z`}
        fill={`url(#${gradientId})`}
        strokeWidth="0"
      />
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
