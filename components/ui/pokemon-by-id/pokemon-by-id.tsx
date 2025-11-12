'use client';
import { typeColors } from '@/components/types';
import { Button } from '@/components/ui/button';
import { PokemonCarousel } from '@/components/ui/pokemon-by-id/pokemon-carousel';
import { PokemonEvolution } from '@/components/ui/pokemon-by-id/pokemon-evolution';
import { PokemonHeader } from '@/components/ui/pokemon-by-id/pokemon-header';
import { PokemonParticles } from '@/components/ui/pokemon-particles';
import { PokemonDamageRelations } from './damage-relation/pokemon-damage-relations';
import Link from 'next/link';
import { PokemonStats } from './stats/pokemon-stats';
import type {
  Evolution,
  HeaderData,
  PokemonData,
} from '@/components/utils/pokemon-data-formatter';
import {
  gradientColorClass,
  backgroundColorClass,
  hoverColorClass,
} from '@/components/utils/color-util';
import { Badge } from '../badge';

export default function PokemonById({
  formattedPokemon,
  evolutions,
  headerData,
}: {
  formattedPokemon: PokemonData;
  evolutions: Evolution[];
  headerData: HeaderData;
}) {
  const backgroundColor = backgroundColorClass(formattedPokemon.color);
  const gradientColor = gradientColorClass(formattedPokemon.color);
  const statsDetails = [
    { label: 'Height', value: formattedPokemon.height },
    { label: 'Category', value: formattedPokemon.category },
    { label: 'Weight', value: formattedPokemon.weight },
    { label: 'Abilities', value: formattedPokemon.abilities.join(', ') },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <PokemonParticles />
      <div className="relative z-10">
        <PokemonHeader
          headerData={headerData}
          backgroundColor={backgroundColor}
          gradientColor={gradientColor}
        />

        <main className="max-w-6xl mx-auto p-6">
          <div
            className={`${gradientColor} text-white rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-4 sm:py-6 mb-6 sm:mb-8 text-center shadow-xl`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-super-adorable">
              {formattedPokemon.name} #{formattedPokemon.id}
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <PokemonCarousel
                formattedPokemon={formattedPokemon}
                gradientColor={gradientColor}
              />
              <div className="mt-8">
                <PokemonStats formattedPokemon={formattedPokemon} />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p
                // className={`${
                //   backgroundColor ?? 'bg-gray-500'
                // } text-white p-4 rounded-lg`}
                className={`${gradientColor} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl`}
              >
                {formattedPokemon.description ||
                  'The tentacles are normally kept short. On hunts, they are extended to ensnare and immobilize prey.'}
              </p>

              <div
                // className={`${
                //   backgroundColor ?? 'bg-gray-500'
                // } text-white p-4 rounded-lg`}
                className={`${gradientColor} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl`}
              >
                <div className="grid grid-cols-2 gap-4">
                  {statsDetails.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-sm font-semibold opacity-90 mb-1">
                        {label}
                      </p>
                      <p className="text-xl sm:text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div>
                <h3
                  className={`${
                    backgroundColor ?? 'bg-gray-500'
                  } text-white p-4 rounded-lg text-lg mb-2 font-super-adorable`}
                >
                  Type
                </h3>
                <div className="flex gap-2">
                  {formattedPokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`inline-block px-3 py-1 rounded text-white ${
                        typeColors[type] || 'bg-gray-500'
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div> */}
              <div
                className={`${gradientColor} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl`}
              >
                <h3 className="text-lg sm:text-xl font-black mb-3 font-super-adorable">
                  Type
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {formattedPokemon.types.map((type) => (
                    <Badge
                      key={type}
                      className={`${
                        typeColors[type as keyof typeof typeColors]
                      } text-white font-bold px-4 py-2 text-sm sm:text-base`}
                    >
                      {type.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              {formattedPokemon.damageRelations ? (
                <PokemonDamageRelations
                  formattedPokemon={formattedPokemon}
                  gradientColor={gradientColor}
                />
              ) : (
                <p className="text-red-500">
                  Error: Damage relations data is missing
                </p>
              )}
            </div>
          </div>

          <div className="mt-12">
            <PokemonEvolution
              evolutions={evolutions}
              backgroundColor={backgroundColor}
              gradientColor={gradientColor}
            />
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/">
              <Button
                // onClick={onClose}
                className={`${gradientColor} hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-6 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105`}
              >
                Explore More Pokemon
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
