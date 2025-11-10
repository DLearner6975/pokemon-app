import { Star } from 'lucide-react';
import { StatBar } from './stat-bar';
import type { PokemonData } from '@/components/utils/pokemon-data-formatter';
import {
  backgroundColorClass,
  statsColorClass,
} from '@/components/utils/color-util';
export function PokemonStats({
  formattedPokemon,
}: {
  formattedPokemon: PokemonData;
}) {
  const stats = formattedPokemon.stats;
  const hasAnyStatOverMax = Object.values(stats)
    .filter((stat): stat is number => typeof stat === 'number')
    .some((stat) => stat > 100);
  const backgroundColor = backgroundColorClass(formattedPokemon?.color);
  const statsColor = statsColorClass(formattedPokemon?.color);
  return (
    <div className={`${backgroundColor ?? 'bg-gray-500'} p-4 rounded-lg`}>
      <div className="space-y-2">
        {Object.entries(stats).map(([statName, value]) => (
          <div key={statName}>
            <div className="text-sm text-white font-super-adorable">
              {statName
                .replace(/([A-Z])/g, ' $1')
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </div>
            <StatBar value={value} statsColor={statsColor} />
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
