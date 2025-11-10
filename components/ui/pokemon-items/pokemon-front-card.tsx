import {
  PokemonCardProps,
  shadowColorMap,
  typeColors,
} from '@/components/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Fragment } from 'react';

export const PokemonFrontCard = ({ details }: PokemonCardProps) => {
  const { name, color, types, abilities, sprites } = details;
  const shadowClass = shadowColorMap[color?.name ?? 'shadow-gray-500'];
  const displayImageUrl =
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.home?.front_default ||
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.dream_world?.front_default ||
    sprites?.front_default;
  return (
    <div className="backface-hidden">
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-primary/20 p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              {name}
            </h3>
            <span className="text-base sm:text-lg font-bold text-muted-foreground">
              #{details.id.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-3 sm:mb-4 border-2 border-primary/10 shadow-inner flex-shrink-0">
            <Image
              src={displayImageUrl || '/placeholder.svg'}
              alt={name}
              className="w-full h-32 sm:h-44 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
              width={150}
              height={150}
              priority
            />
          </div>

          <div className="space-y-3 sm:space-y-4 flex-1">
            <div>
              <p className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2">
                Types:
              </p>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {types.map((type, index) => (
                  <Badge
                    key={index}
                    className={`${
                      typeColors[type?.type?.name as keyof typeof typeColors]
                    } text-white font-bold px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm hover:scale-105 transition-transform duration-200 shadow-md`}
                  >
                    {type?.type?.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2">
                Abilities:
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                {abilities.map((ability) => ability?.ability?.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className={`relative flex justify-center items-center ${shadowClass} rounded-lg overflow-hidden h-[180px] group`}
      >
        <Image
          src={displayImageUrl || '/placeholder-image.jpg'}
          alt={`${name} sprite`}
          width={150}
          height={150}
          // className={`w-[150px] h-[150px] object-contain p-4 transition-all duration-300 ease-in-out transform group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-3 z-10 shadow-lg rounded-lg ${shadowClass} md:backface-hidden`}
          className={`object-contain max-w-full max-h-full p-4 transition-transform duration-300 ease-in-out transform group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-3 shadow-lg rounded-lg ${shadowClass}`}
          aria-label={`${name} image. Hover to enlarge.`}
          priority
        />
      </div>
      <div className="flex items-center flex-wrap gap-0.5">
        <h3 className="font-semibold text-xs mr-1">Types:</h3>
        {types.map((type, index) => (
          <Badge
            key={index}
            className={`capitalize text-white text-xs ${
              typeColors[type?.type?.name] || 'bg-gray-500'
            }`}
          >
            {type?.type?.name}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-start text-xs">
        <h3 className="font-semibold  mr-1">Abilities:</h3>
        <div className="flex flex-wrap">
          {abilities.map((ability, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="mx-1">/</span>}
              <span className="capitalize">{ability?.ability?.name}</span>
            </Fragment>
          ))}
        </div>
      </div> */}
    </div>
  );
};
