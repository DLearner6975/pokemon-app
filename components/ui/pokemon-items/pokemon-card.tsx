import { useState } from 'react';
//TODO: Look into  shadowColorMap for background image.
import { PokemonCardProps } from '@/components/types';
import PokemonBackCard from './pokemon-back-card';
import { PokemonFrontCard } from './pokemon-front-card';

export function PokemonCard({ details }: PokemonCardProps) {
  const { id } = details;
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);

  const shouldIgnoreClick = (target: HTMLElement): boolean => {
    const isLink = target.closest('a') !== null;
    const isDialogOpen =
      document.querySelector('[role="dialog"][data-state="open"]') !== null;
    const isDialogElement =
      target.closest('[role="dialog"]') !== null ||
      target.getAttribute('role') === 'dialog' ||
      target.closest('[data-radix-portal]') !== null;

    return isLink || isDialogOpen || isDialogElement;
  };

  const handleCardClick = (e: React.MouseEvent, id: number) => {
    const target = e.target as HTMLElement;

    if (shouldIgnoreClick(target)) return;

    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[id] = !newFlipped[id];
      return newFlipped;
    });
  };

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
