// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { backgroundColorMap, PokemonCardProps } from '@/components/types';
import { ChevronsDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PokemonBackCard({
  details,
  isFlipped,
}: PokemonCardProps) {
  const { id, name, base_experience, height, weight, color, stats, sprites } =
    details;
  const backgroundColorClass =
    backgroundColorMap[color?.name ?? 'gray'] ?? 'bg-gray-500';

  return (
    <div
      className={`absolute inset-0 backface-hidden rotate-y-180 ${
        isFlipped[id] ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 ${backgroundColorClass}  rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white/20 p-4 sm:p-6 shadow-xl h-full text-white relative overflow-hidden flex flex-col`}
      >
        <div className="flex-1 relative z-10">
          <Image
            src={sprites?.back_default || '/placeholder.svg'}
            alt={name}
            className="absolute bottom-4 right-4 w-16 h-16 sm:w-20 sm:h-20 opacity-80"
            width={80}
            height={80}
            priority
          />

          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl capitalize font-super-adorable">
              {name}
            </h3>
            <span className="text-base sm:text-lg italic font-super-adorable">
              #{id.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-0.5 opacity-90">
                  Height
                </p>
                <p className="text-2xl sm:text-3xl font-super-adorable">
                  {height}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-0.5 opacity-90">
                  Weight
                </p>
                <p className="text-2xl sm:text-3xl font-super-adorable">
                  {weight}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-0.5 opacity-90">
                  Base Exp
                </p>
                <p className="text-2xl sm:text-3xl font-super-adorable">
                  {base_experience}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm sm:text-base font-black mb-2 sm:mb-3">
                Stats
              </p>
              {stats.map((s, index) => (
                <div key={index}>
                  <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-90">{s.stat.name}</span>
                      <span className="font-super-adorable">{s.base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4 relative z-20">
          <Link
            href={`/pokemon/${id}`}
            className="flex items-center gap-2 text-sm sm:text-base font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 hover:from-yellow-500 hover:via-orange-500 hover:to-pink-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/50"
          >
            <span>More details</span>
            <ChevronsDown className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
