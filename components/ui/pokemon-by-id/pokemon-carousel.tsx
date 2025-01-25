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
    <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={`Carousel image ${index + 1}`}
                    width={400}
                    height={400}
                    className="object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <CarouselPrevious className="relative left-0 translate-x-0" />
        <CarouselNext className="relative right-0 translate-x-0" />
      </div>
    </Carousel>
  );
}
