import { PokemonCardProps, typeColors } from '@/components/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { gradientColorClass } from '@/components/utils/color-util';

export const PokemonFrontCard = ({ details }: PokemonCardProps) => {
  const { name, types, abilities, sprites } = details;
  const displayImageUrl =
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.home?.front_default ||
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.dream_world?.front_default ||
    sprites?.front_default;
  const gradientColor = gradientColorClass(
    details?.color?.name ?? 'bg-gray-500'
  );
  return (
    <div className="backface-hidden">
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-primary/20 p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              {name.charAt(0).toUpperCase() + name.slice(1)}
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
              <p className="text-xs font-semibold text-foreground mb-1.5">
                Abilities:
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {abilities.map((ability, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-[10px] sm:text-xs px-2 py-0.5 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 font-medium hover:scale-105 transition-transform duration-200"
                  >
                    {ability?.ability?.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
