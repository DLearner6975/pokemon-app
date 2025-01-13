import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fragment } from 'react';

interface PokemonCardProps {
  name: string;
  number: number;
  imageUrl: string;
  types: string[];
  abilities: string[];
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

export function PokemonCard({
  name,
  number,
  imageUrl,
  types,
  abilities,
}: PokemonCardProps) {
  return (
    <Card className="overflow-hidden w-full max-w-[280px] group">
      <CardHeader className="p-4">
        <CardTitle className="flex justify-between items-center">
          <span className="text-base capitalize">{name}</span>
          <span className="text-sm text-gray-500">
            #{number.toString().padStart(3, '0')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div className="relative flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden h-[180px] group">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={imageUrl || '/placeholder-image.jpg'}
            alt={`${name} sprite`}
            width={150}
            height={150}
            className="w-[150px] h-[150px] object-contain p-4 transition-all duration-300 ease-in-out transform group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-3 z-10 shadow-lg rounded-lg bg-white"
            aria-label={`${name} image. Hover to enlarge.`}
            priority
          />
        </div>
        <div className="flex items-center flex-wrap gap-0.5">
          <h3 className="font-semibold text-xs mr-1">Types:</h3>
          {types.map((type) => (
            <Badge
              key={type}
              className={`capitalize text-white text-xs ${
                typeColors[type] || 'bg-gray-500'
              }`}
            >
              {type}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-start text-xs">
          <h3 className="font-semibold  mr-1">Abilities:</h3>
          <div className="flex flex-wrap">
            {abilities.map((ability, index) => (
              <Fragment key={ability}>
                {index > 0 && <span className="mx-1">/</span>}
                <span className="capitalize">{ability}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
