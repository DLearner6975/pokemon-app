import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HeaderData } from '@/components/utils/pokemon-data-formatter';

interface PokemonHeaderProps {
  headerData: HeaderData;
  backgroundColor?: string;
}

export function PokemonHeader({
  headerData,
  backgroundColor,
}: PokemonHeaderProps) {
  const { prevPokemon, nextPokemon, currentPokemon, allPokemon } = headerData;
  const router = useRouter();

  return (
    <div
      className={`grid grid-cols-3 sticky top-0 z-20 items-center ${
        backgroundColor ?? 'bg-gray-500'
      } text-white px-4 py-2`}
    >
      <div>
        {prevPokemon && (
          <Link
            href={`/pokemon/${prevPokemon.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>#{prevPokemon.id}</span>
            <span className="hidden sm:inline">{prevPokemon.name}</span>
          </Link>
        )}
      </div>
      <div className="flex justify-center">
        <Select onValueChange={(value) => router.push(`/pokemon/${value}`)}>
          <SelectTrigger className="w-[180px] bg-white text-gray-800">
            <SelectValue
              placeholder={<p className="text-center">{currentPokemon.name}</p>}
            />
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[300px] overflow-y-auto">
              {allPokemon?.map((pokemon) => (
                <SelectItem key={pokemon.id} value={pokemon.id}>
                  <p className="text-center"> {pokemon.name}</p>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        {nextPokemon && (
          <Link
            href={`/pokemon/${nextPokemon.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <span className="hidden sm:inline">{nextPokemon.name}</span>
            <span>#{nextPokemon.id}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
