import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { PokemonCardProps, shadowColorMap } from '@/components/types';
import PokemonBackCard from './pokemon-back-card';
import { PokemonFrontCard } from './pokemon-front-card';

export function PokemonCard({ details }: PokemonCardProps) {
  const { name, id, color } = details;
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const handleCardClick = (e: React.MouseEvent, id: number) => {
    // ✅ Only flip if the click wasn't on a link
    const target = e.target as HTMLElement;
    if (target.closest('a')) return; // Don't flip if clicking a link

    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[id] = !newFlipped[id];
      return newFlipped;
    });
  };
  const shadowClass = shadowColorMap[color?.name ?? 'shadow-gray-500'];

  return (
    <div onClick={(e) => handleCardClick(e, id)}>
      <div
        className={` transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped[id] ? 'rotate-y-180' : ''
        }`}
      >
        <PokemonFrontCard details={details} isFlipped={isFlipped} />

        <PokemonBackCard details={details} isFlipped={isFlipped} />
      </div>
    </div>
  );
}
