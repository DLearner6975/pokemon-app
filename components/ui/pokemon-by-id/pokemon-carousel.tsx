import Image from 'next/image';
// TODO: Uncomment this out.  look deeper into switching to this carousel.
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
//   CarouselApi,
// } from '../carousel';
import { useState } from 'react';
import { Button } from '../button';
import { backgroundColorClass } from '@/components/utils/color-util';
import { PokemonData } from '@/components/utils/pokemon-data-formatter';

export function PokemonCarousel({
  formattedPokemon,
}: {
  formattedPokemon: PokemonData;
}) {
  const images = formattedPokemon?.images;
  const backgroundColor = backgroundColorClass(formattedPokemon?.color);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-blue-200">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
          <Image
            src={images[currentImageIndex] || '/placeholder.svg'}
            alt={`${formattedPokemon.name} sprite image ${
              currentImageIndex + 1
            } of ${images.length}`}
            className="w-full h-full max-h-[250px] sm:max-h-[300px] object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold">
          {currentImageIndex + 1}/{images.length}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentImageIndex
                ? `w-8 ${backgroundColor}`
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
