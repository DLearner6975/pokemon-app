import { PokemonFrontCardProps, typeColors } from '@/components/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { gradientColorClass } from '@/components/utils/color-util';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export const PokemonFrontCard = ({
  details,
  isFlipped,
}: PokemonFrontCardProps) => {
  const { id, name, types, abilities, sprites } = details;
  const displayImageUrl =
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.home?.front_default ||
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.dream_world?.front_default ||
    sprites?.front_default;
  const displayedAbilities = abilities.slice(0, 2);
  const hasMoreAbilities = abilities.length > 2;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const remainingCount = abilities.length - 2;
  const gradientColor = gradientColorClass(
    details?.color?.name ?? 'bg-gray-500'
  );
  return (
    <div
      className={`backface-hidden ${
        isFlipped[id] ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-primary/20 p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3 sm:mb-4 font-super-adorable">
            <h3 className="text-xl sm:text-2xl  text-foreground capitalize ">
              {name}
            </h3>
            <span className="text-base sm:text-lg italic text-muted-foreground">
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
              <p className="text-xs sm:text-sm text-foreground mb-1.5 sm:mb-2 font-super-adorable">
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
              <p className="text-xs mb-1.5 font-super-adorable">Abilities:</p>
              <div className="flex gap-1.5 flex-wrap">
                {displayedAbilities.map((ability, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-purple-700 dark:text-purple-300 border-2 border-purple-400 dark:border-purple-600 font-semibold text-xs px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    {ability?.ability?.name}
                  </Badge>
                ))}
                {hasMoreAbilities && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-xs font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all cursor-pointer focus-visible:ring-4 focus-visible:ring-purple-300 focus-visible:ring-offset-2"
                        aria-label={`View ${remainingCount} more ${
                          remainingCount === 1 ? 'ability' : 'abilities'
                        } for ${name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        +{remainingCount} more
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="sm:max-w-[425px] rounded-3xl border-4 border-purple-200 dark:border-purple-800"
                      aria-describedby="abilities-description"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2 capitalize font-super-adorable">
                          <Sparkles
                            className="w-6 h-6 text-yellow-400 animate-pulse"
                            aria-hidden="true"
                          />
                          {name} - All Abilities
                        </DialogTitle>
                      </DialogHeader>
                      <div id="abilities-description" className="sr-only">
                        Complete list of all abilities for {name}
                      </div>
                      <div
                        className="flex flex-wrap gap-3 pt-4"
                        role="list"
                        aria-label={`All abilities for ${name}`}
                      >
                        {abilities.map((ability, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-purple-700 dark:text-purple-300 border-2 border-purple-400 dark:border-purple-600 font-semibold text-sm px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/50"
                            role="listitem"
                          >
                            {ability?.ability?.name}
                          </Badge>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
