import { Star } from 'lucide-react';
import { StatBar } from './stat-bar';
import type { PokemonData } from '@/components/utils/pokemon-data-formatter';
import {
  backgroundColorClass,
  statsColorClass,
  gradientColorClass,
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
  const gradientColor = gradientColorClass(formattedPokemon?.color);
  const maxStat = Math.max(
    stats.hp,
    stats.attack,
    stats.defense,
    stats.specialAttack,
    stats.specialDefense,
    stats.speed
  );

  return (
    <div
      className={`${gradientColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl text-white`}
    >
      <div className="space-y-3 sm:space-y-4">
        {[
          { label: 'HP', value: stats.hp },
          { label: 'Attack', value: stats.attack },
          { label: 'Defense', value: stats.defense },
          { label: 'Special Attack', value: stats.specialAttack },
          { label: 'Special Defense', value: stats.specialDefense },
          { label: 'Speed', value: stats.speed },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between mb-1 text-sm font-semibold">
              <span>{stat.label}</span>
              <span>{stat.value}</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${(stat.value / maxStat) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {hasAnyStatOverMax && (
        <p className="text-xs sm:text-sm text-center mt-4 opacity-80 flex items-center justify-center gap-1">
          <span>✦</span>
          <span>Indicates stat over 100%</span>
        </p>
      )}
    </div>
    // <div className={`${backgroundColor ?? 'bg-gray-500'} p-4 rounded-lg`}>
    //   <div className="space-y-2">
    //     {Object.entries(stats).map(([statName, value]) => (
    //       <div key={statName}>
    //         <div className="text-sm text-white font-super-adorable">
    //           {statName
    //             .replace(/([A-Z])/g, ' $1')
    //             .split(' ')
    //             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //             .join(' ')}
    //         </div>
    //         <StatBar value={value} statsColor={statsColor} />
    //       </div>
    //     ))}
    //   </div>
    //   {hasAnyStatOverMax && (
    //     <div className="mt-3 text-xs text-white flex items-center gap-1">
    //       <span>
    //         <Star className="w-4 h-4" />
    //       </span>
    //       <span>indicates stat over 100%</span>
    //     </div>
    //   )}
    // </div>
  );
}
