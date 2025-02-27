import Image from 'next/image';
import { Card, CardContent } from '../card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from '../carousel';
import { useEffect, useState } from 'react';
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const images = formattedPokemon?.images;
  const backgroundColor = backgroundColorClass(formattedPokemon?.color);
  const hoverColor = hoverColorClass(formattedPokemon?.color);
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Carousel
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto relative"
        setApi={setApi}
      >
        <div className="absolute top-2 right-2 z-10 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
          {current + 1} / {images?.length}
        </div>
        <CarouselContent>
          {images?.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="group">
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      src={src || '/placeholder.svg'}
                      alt={`Carousel image ${index + 1}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-12 flex items-center justify-between">
                      <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                      <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-2 justify-center">
        {images.map((_, index) => (
          <Button
            key={index}
            size="sm"
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? backgroundColor : 'bg-gray-300 '
            } ${hoverColor}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
