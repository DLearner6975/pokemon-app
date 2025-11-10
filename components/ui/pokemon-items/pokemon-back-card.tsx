// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { backgroundColorMap, PokemonCardProps } from '@/components/types';
import { ChevronsDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CardFooter } from '../card';

export default function PokemonBackCard({ details }: PokemonCardProps) {
  console.log('🚀 ~ PokemonBackCard ~ details:', details);
  const { id, name, base_experience, height, weight, color, stats, sprites } =
    details;
  const backgroundColorClass = backgroundColorMap[color?.name ?? 'bg-gray-500'];
  console.log(
    '🚀 ~ PokemonBackCard ~ backgroundColorClass:',
    backgroundColorClass
  );

  return (
    <div
      // className="absolute inset-0 backface-hidden rotate-y-180"
      className={`${
        backgroundColorClass ?? 'bg-gray-500'
      } text-white rounded-2xl sm:rounded-3xl  absolute inset-0 backface-hidden rotate-y-180`}
    >
      <div
        className={`bg-gradient-to-br ${backgroundColorClass} rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white/20 p-4 sm:p-6 shadow-xl h-full text-white relative overflow-hidden flex flex-col`}
      >
        {/* Close button to flip card back */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCardFlip(pokemon.id);
          }}
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center transition-all hover:scale-110"
          aria-label="Flip back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button> */}

        {/* Content layer */}
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
            <h3 className="text-xl sm:text-2xl font-black">{name}</h3>
            <span className="text-base sm:text-lg font-bold">
              #{id.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* Left column - Physical stats */}
            <div className="space-y-2 sm:space-y-3">
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-0.5 opacity-90">
                  Height
                </p>
                <p className="text-2xl sm:text-3xl font-black">{height}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-0.5 opacity-90">
                  Weight
                </p>
                <p className="text-2xl sm:text-3xl font-black">{weight}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold mb-0.5 opacity-90">
                  Base Exp
                </p>
                <p className="text-2xl sm:text-3xl font-black">
                  {base_experience}
                </p>
              </div>
            </div>

            {/* Right column - Stats table */}
            <div>
              <p className="text-sm sm:text-base font-black mb-2 sm:mb-3">
                Stats
              </p>
              {stats.map((s, index) => (
                <div key={index}>
                  <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-90">{s.stat.name}</span>
                      <span className="font-bold">{s.base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* More details link */}
        <div className="flex justify-center pt-4 relative z-20">
          <Link
            href={`/pokemon/${id}`}
            className="flex items-center gap-2 text-sm sm:text-base font-semibold opacity-90 hover:opacity-100 transition-all bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl backdrop-blur-sm border-2 border-white/30 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>More details</span>
            <ChevronsDown className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
    // <div
    //   className={`${
    //     backgroundColorClass ?? 'bg-gray-500'
    //   } text-white rounded-lg p-6 max-w-md h-[350px] absolute inset-0 backface-hidden rotate-y-180`}
    // >
    //   <div className="grid grid-cols-[100px_1fr] gap-6">
    //     <div className="space-y-3">
    //       <div>
    //         <p className="text-sm font-medium text-white/70">Height</p>
    //         <p className="text-lg font-semibold">{height}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm font-medium text-white/70">Weight</p>
    //         <p className="text-lg font-semibold">{weight}</p>
    //       </div>
    //       <div>
    //         <p className="text-sm font-medium text-white/70">Base Exp</p>
    //         <p className="text-lg font-semibold">{base_experience}</p>
    //       </div>
    //     </div>
    //     <div>
    //       <p className="font-medium mb-3">Stats</p>
    //       <div className="space-y-1.5 text-sm">
    //         {stats.map((s, index) => (
    //           <div key={index} className="flex justify-between">
    //             <span className="text-white/70">{s?.stat?.name}</span>
    //             <span>{s.base_stat}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <CardFooter className="justify-center p-4 pt-0">
    //     <Link
    //       className="text-white/90 hover:text-white hover:bg-white/10 flex"
    //       href={`/pokemon/${details?.id}`}
    //     >
    //       More details
    //       <ChevronsDown className="ml-2 h-4 w-4 animate-bounce" />
    //     </Link>
    //   </CardFooter>
    // </div>
  );
}
