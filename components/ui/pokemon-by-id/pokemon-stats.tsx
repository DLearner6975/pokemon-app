// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500">
          ★
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
    backgroundColorClass?: string;
  };
}

export function PokemonStats({
  stats,
  backgroundColorClass,
}: PokemonStatsProps) {
  const hasAnyStatOverMax = Object.values(stats).some((stat) => stat > 100);

  return (
    <div className="bg-gray-300 p-4 rounded-lg">
      <div className="space-y-2">
        <div>
          <div className="text-sm">HP</div>
          <StatBar
            value={stats.hp}
            backgroundColorClass={backgroundColorClass}
          />{' '}
        </div>
        <div>
          <div className="text-sm">Attack</div>
          <StatBar
            value={stats.attack}
            backgroundColorClass={backgroundColorClass}
          />
        </div>
        <div>
          <div className="text-sm">Defense</div>
          <StatBar
            value={stats.defense}
            backgroundColorClass={backgroundColorClass}
          />
        </div>
        <div>
          <div className="text-sm">Special Attack</div>
          <StatBar
            value={stats.specialAttack}
            backgroundColorClass={backgroundColorClass}
          />
        </div>
        <div>
          <div className="text-sm">Special Defense</div>
          <StatBar
            value={stats.specialDefense}
            backgroundColorClass={backgroundColorClass}
          />
        </div>
        <div>
          <div className="text-sm">Speed</div>
          <StatBar
            value={stats.speed}
            backgroundColorClass={backgroundColorClass}
          />
        </div>
      </div>
      {hasAnyStatOverMax && (
        <div className="mt-3 text-xs text-gray-600 flex items-center gap-1">
          <span className="text-red-500 font-bold">★</span>
          <span>indicates stat exceeds base maximum</span>
        </div>
      )}
    </div>
  );
}
