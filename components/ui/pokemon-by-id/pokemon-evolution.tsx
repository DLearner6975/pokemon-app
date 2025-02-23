import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Evolution {
  id: string;
  name: string;
  types: string[];
  image: string;
}

interface PokemonEvolutionProps {
  evolutions: Evolution[];
  backgroundColorClass: string;
}

export function PokemonEvolution({
  evolutions,
  backgroundColorClass,
}: PokemonEvolutionProps) {
  if (!evolutions || evolutions.length === 0) {
    return null;
  }

  return (
    <div
      className={`${backgroundColorClass ?? 'bg-gray-500'} p-6 rounded-lg mt-8`}
    >
      <h2 className="text-white text-xl mb-4">Evolutions</h2>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {evolutions.map((evolution, index) => {
          return (
            <div key={evolution.id} className="flex items-center">
              <Link href={`/pokemon/${evolution.id}`} className="group">
                <div className="relative transition-transform transform group-hover:scale-105">
                  <div className="bg-white rounded-full p-2 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                    <Image
                      src={
                        evolution?.image ||
                        `/placeholder.svg?height=100&width=100`
                      }
                      alt={evolution.name}
                      width={100}
                      height={100}
                      className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-white group-hover:underline text-sm sm:text-base">
                      {evolution.name}
                    </div>
                    <div className="text-gray-300 text-sm">#{evolution.id}</div>
                    <div className="flex gap-1 justify-center mt-1 flex-wrap">
                      {evolution.types.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 text-xs rounded bg-orange-500 text-white"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              {index < evolutions.length - 1 && (
                <div className="text-white mx-2 sm:mx-4 rotate-90 sm:rotate-0">
                  <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
