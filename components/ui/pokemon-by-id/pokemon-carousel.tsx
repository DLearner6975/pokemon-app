import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../carousel';
import { Button } from '../button';
import {
  backgroundColorClass,
  hoverColorClass,
} from '@/components/utils/color-util';
import { PokemonData } from '@/components/utils/pokemon-data-formatter';

export function PokemonCarousel({
  formattedPokemon,
}: {
  formattedPokemon: PokemonData;
}) {
  const images = formattedPokemon?.images;
  const backgroundColor = backgroundColorClass(formattedPokemon?.color);
  const hoverColor = hoverColorClass(formattedPokemon?.color);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-blue-200"
    >
      <div className="relative">
        <CarouselContent className="relative">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px]"
            >
              <Image
                src={src || '/placeholder.svg'}
                alt={`${formattedPokemon.name} sprite image ${index + 1} of ${images.length}`}
                className="w-full h-full max-h-[250px] sm:max-h-[300px] object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                width={400}
                height={300}
                priority={index === 0}
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold">
                {current + 1}/{images.length}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <CarouselPrevious
            className={`relative left-0 translate-x-0 pointer-events-auto ${hoverColor} hover:text-white`}
          />
          <CarouselNext
            className={`relative right-0 translate-x-0 pointer-events-auto ${hoverColor} hover:text-white`}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? `w-8 ${backgroundColor}` : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
