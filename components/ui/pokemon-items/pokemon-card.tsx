import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { PokemonCardProps, shadowColorMap } from '@/components/types';
import PokemonBackCard from './pokemon-back-card';
import { PokemonFrontCard } from './pokemon-front-card';

export function PokemonCard({ details }: PokemonCardProps) {
  const { name, id, color } = details;
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const handleCardClick = (id: number) => {
    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[id] = !newFlipped[id];
      return newFlipped;
    });
  };
  const shadowClass = shadowColorMap[color?.name ?? 'shadow-gray-500'];

  return (
    <div onClick={() => handleCardClick(id)}>
      {/* <CardHeader className="p-4">
        <CardTitle className="font-super-adorable flex justify-between items-center">
          <span className="text-base capitalize">{name}</span>
          <span className="text-sm text-gray-500">
            #{id.toString().padStart(2, '0')}
          </span>
        </CardTitle>
      </CardHeader> */}
      <div
        className={` transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped[id] ? 'rotate-y-180' : ''
        }`}
      >
        <PokemonFrontCard details={details} />
        <PokemonBackCard details={details} />
      </div>
    </div>
  );
}
