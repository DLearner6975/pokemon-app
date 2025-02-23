import { Star } from 'lucide-react';
import { StatBarProps } from './types';

export function StatBar({
  value,
  maxValue = 100,
  backgroundColorClass,
}: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  const isOverMaxValue = percentage > 100;

  return (
    <div className="relative">
      <div className="h-2 bg-gray-200 w-full">
        <div
          className={`h-full ${backgroundColorClass ?? 'bg-gray-500'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isOverMaxValue && (
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white">
          <Star className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
