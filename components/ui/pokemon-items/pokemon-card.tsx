import { useState, useRef } from 'react';
//TODO: Look into  shadowColorMap for background image.
import { PokemonCardProps } from '@/components/types';
import PokemonBackCard from './pokemon-back-card';
import { PokemonFrontCard } from './pokemon-front-card';

interface PokemonCardExtendedProps extends PokemonCardProps {
  onFlip?: (name: string, id: number) => void;
}

export function PokemonCard({ details, onFlip }: PokemonCardExtendedProps) {
  const { id, name } = details;
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const hasFlippedRef = useRef(false);

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

  const handleCardClick = (e: React.MouseEvent, cardId: number) => {
    const target = e.target as HTMLElement;

    if (shouldIgnoreClick(target)) return;

    const isCurrentlyFlipped = isFlipped[cardId];
    if (!isCurrentlyFlipped && !hasFlippedRef.current) {
      hasFlippedRef.current = true;
      onFlip?.(name, cardId);
    }

    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[cardId] = !newFlipped[cardId];
      return newFlipped;
    });
  };

  return (
    <div
      onClick={(e) => handleCardClick(e, id)}
      aria-label="Flip pokemon card"
      role="button"
      tabIndex={0}
      className="cursor-pointer"
    >
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
