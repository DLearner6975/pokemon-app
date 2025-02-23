import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Pokemon {
  id: string;
  name: string;
}

interface PokemonHeaderProps {
  prevPokemon: Pokemon;
  nextPokemon: Pokemon;
  currentPokemon: Pokemon;
  allPokemon: Pokemon[];
  backgroundColorClass?: string;
}

export function PokemonHeader({
  prevPokemon,
  nextPokemon,
  currentPokemon,
  allPokemon,
  backgroundColorClass,
}: PokemonHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between ${
        backgroundColorClass ?? 'bg-gray-500'
      } text-white px-4 py-2`}
    >
      <Link
        href={`/pokemon/${prevPokemon?.id}`}
        className="flex items-center gap-2 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>#{prevPokemon?.id}</span>
        <span>{prevPokemon?.name}</span>
      </Link>
      <Select
        onValueChange={(value) => (window.location.href = `/pokemon/${value}`)}
      >
        <SelectTrigger className="w-[180px] bg-white text-gray-800">
          <SelectValue
            placeholder={`#${currentPokemon.id} ${currentPokemon.name}`}
          />
        </SelectTrigger>
        <SelectContent>
          {allPokemon?.map((pokemon) => (
            <SelectItem key={pokemon.id} value={pokemon.id}>
              #{pokemon.id} {pokemon.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Link
        href={`/pokemon/${nextPokemon?.id}`}
        className="flex items-center gap-2 hover:underline"
      >
        <span>{nextPokemon?.name}</span>
        <span>#{nextPokemon?.id}</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
