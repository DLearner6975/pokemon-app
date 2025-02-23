import Image from 'next/image';
import { Card, CardContent } from '../card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../carousel';

interface PokemonCarouselProps {
  images: string[];
}

export function PokemonCarousel({ images }: PokemonCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto relative">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`Carousel image ${index + 1}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-12 flex items-center justify-between">
                    <CarouselPrevious className="h-8 w-8" />
                    <CarouselNext className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
