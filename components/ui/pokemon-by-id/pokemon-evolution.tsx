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
  backgroundColor: string;
  gradientColor: string;
}

export function PokemonEvolution({
  evolutions,
  gradientColor,
}: PokemonEvolutionProps) {
  if (!evolutions || evolutions.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 sm:mt-8">
      <div
        className={`${gradientColor} text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl`}
      >
        <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">
          Evolutions
        </h2>
        <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
          {evolutions.map((evolution, index) => (
            <div
              key={evolution.id}
              className="flex items-center gap-4 sm:gap-8"
            >
              <Link
                href={`/pokemon/${evolution.id}`}
                className="text-center block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-2xl"
              >
                <div className="bg-white rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center shadow-xl mb-3">
                  <Image
                    src={
                      evolution?.image ||
                      `/placeholder.svg?height=100&width=100`
                    }
                    alt={`${evolution.name} evolution sprite`}
                    width={100}
                    height={100}
                    className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                  />
                </div>
                <p className="font-bold text-sm sm:text-base">
                  {evolution.name}
                </p>
                <p className="text-xs sm:text-sm opacity-90">#{evolution.id}</p>
              </Link>
              {index < evolutions.length - 1 && (
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
