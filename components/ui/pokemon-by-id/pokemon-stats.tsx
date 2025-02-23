import { Star } from 'lucide-react';

interface StatBarProps {
  value: number;
  maxValue?: number;
  backgroundColorClass?: string;
}

function StatBar({
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

interface PokemonStatsProps {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  backgroundColorClass?: string;
}

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
