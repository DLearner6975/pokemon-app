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
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  const images = formattedPokemon?.images;
  const backgroundColor = backgroundColorClass(formattedPokemon?.color);
  // const hoverColor = hoverColorClass(formattedPokemon?.color);
  // useEffect(() => {
  //   if (!api) return;

  //   api.on('select', () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  // const scrollTo = (index: number) => {
  //   api?.scrollTo(index);
  // };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-blue-200">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
          <Image
            src={images[currentImageIndex] || '/placeholder.svg'}
            alt={`${formattedPokemon.name} ${currentImageIndex + 1}`}
            className="w-full h-full max-h-[250px] sm:max-h-[300px] object-contain drop-shadow-2xl"
            // width={100}
            // height={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
            // src={src || '/placeholder.svg'}
            //                   alt={`Carousel image ${index + 1}`}
            //                   fill
            //                   priority
            //
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
    // <div className="flex flex-col items-center gap-4">
    //   <Carousel
    //     className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto relative"
    //     setApi={setApi}
    //   >
    //     <div className="absolute top-2 right-2 z-10 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
    //       {current + 1} / {images?.length}
    //     </div>
    //     <CarouselContent>
    //       {images?.map((src, index) => (
    //         <CarouselItem key={index}>
    //           <div className="p-1">
    //             <Card className="group">
    //               <CardContent className="flex aspect-square items-center justify-center p-6 relative">
    //                 <Image
    //                   src={src || '/placeholder.svg'}
    //                   alt={`Carousel image ${index + 1}`}
    //                   fill
    //                   priority
    //                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //                 />
    //                 <div className="absolute inset-12 flex items-center justify-between">
    //                   <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
    //                   <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           </div>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //   </Carousel>
    //   <div className="flex gap-2 justify-center">
    //     {images.map((_, index) => (
    //       <Button
    //         key={index}
    //         size="sm"
    //         className={`w-2 h-2 rounded-full transition-colors ${
    //           index === current ? backgroundColor : 'bg-gray-300 '
    //         } ${hoverColor}`}
    //         onClick={() => scrollTo(index)}
    //         aria-label={`Go to image ${index + 1}`}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
}
