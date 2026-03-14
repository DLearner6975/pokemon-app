import { useState } from 'react';
import PokemonBackCard from './pokemon-back-card';
import { PokemonFrontCard } from './pokemon-front-card';
import type { PokemonListEntity } from '@/lib/pokemon/model/types';

export function PokemonCard({ details }: { details: PokemonListEntity }) {
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (shouldIgnoreClick(target)) return;
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      aria-label="Flip pokemon card"
      role="button"
      tabIndex={0}
      className="cursor-pointer"
    >
      <div
        className={` transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <PokemonFrontCard details={details} isFlipped={isFlipped} />

        <PokemonBackCard details={details} isFlipped={isFlipped} />
      </div>
    </div>
  );
}
