import { Star } from 'lucide-react';
import { PokemonStatsProps } from './types';
import { StatBar } from './stat-bar';

export function PokemonStats({
  stats,
  backgroundColorClass,
}: PokemonStatsProps) {
  const hasAnyStatOverMax = Object.values(stats)
    .filter((stat): stat is number => typeof stat === 'number')
    .some((stat) => stat > 100);

  return (
    <div className={`${backgroundColorClass ?? 'bg-gray-500'} p-4 rounded-lg`}>
      <div className="space-y-2">
        {Object.entries(stats).map(([statName, value]) => (
          <div key={statName}>
            <div className="text-sm text-white font-bold">
              {statName
                .replace(/([A-Z])/g, ' $1')
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </div>
            <StatBar value={value} />
          </div>
        ))}
      </div>
      {hasAnyStatOverMax && (
        <div className="mt-3 text-xs text-white flex items-center gap-1">
          <span>
            <Star className="w-4 h-4" />
          </span>
          <span>indicates stat over 100%</span>
        </div>
      )}
    </div>
  );
}
