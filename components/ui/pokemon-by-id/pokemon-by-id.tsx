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
import { hoverColorClass } from '@/components/utils/color-util';
import { backgroundColorClass } from '@/components/utils/color-util';

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
  const hoverColor = hoverColorClass(formattedPokemon.color);
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
        />

        <main className="max-w-6xl mx-auto p-6">
          <h1
            className={`${
              backgroundColor ?? 'bg-gray-500'
            } text-white p-4 rounded-lg text-3xl text-center mb-8 font-super-adorable`}
          >
            {formattedPokemon.name} #{formattedPokemon.id}
          </h1>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <PokemonCarousel formattedPokemon={formattedPokemon} />
              <div className="mt-8">
                <PokemonStats formattedPokemon={formattedPokemon} />
              </div>
            </div>
            <div className="space-y-6">
              <p
                className={`${
                  backgroundColor ?? 'bg-gray-500'
                } text-white p-4 rounded-lg`}
              >
                {formattedPokemon.description}
              </p>

              <div
                className={`${
                  backgroundColor ?? 'bg-gray-500'
                } text-white p-4 rounded-lg`}
              >
                <div className="grid grid-cols-2 gap-4">
                  {statsDetails.map(({ label, value }) => (
                    <div key={label}>
                      <div>{label}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
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
              </div>

              {formattedPokemon.damageRelations ? (
                <PokemonDamageRelations formattedPokemon={formattedPokemon} />
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
            />
          </div>

          <div className="text-center mt-8">
            <Link href="/">
              <Button
                variant="default"
                className={`${
                  backgroundColor ?? 'bg-gray-500'
                } ${hoverColor} font-super-adorable`}
              >
                Explore More Pokémon
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
