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
  gradientColor,
}: PokemonHeaderProps) {
  const { prevPokemon, nextPokemon, currentPokemon, allPokemon } = headerData;
  const router = useRouter();

  return (
    <div
      className={`${gradientColor} text-white py-4 px-4 sm:px-6 sticky top-0 z-10 shadow-lg`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {prevPokemon && (
          <Link
            href={`/pokemon/${prevPokemon?.id}`}
            className="flex items-center gap-2 font-bold hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>#{prevPokemon?.id}</span>
            <span className="hidden md:inline">{prevPokemon?.name}</span>
          </Link>
        )}

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <Select onValueChange={(value) => router.push(`/pokemon/${value}`)}>
              <SelectTrigger className="w-[180px] bg-white text-gray-800">
                <SelectValue
                  placeholder={
                    <p className="text-center">{currentPokemon.name}</p>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <div className="max-h-[300px] overflow-y-auto">
                  {allPokemon?.map((pokemon) => (
                    <SelectItem key={pokemon.id} value={pokemon.id}>
                      <p className="text-center">{pokemon.name}</p>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        {nextPokemon && (
          <Link
            href={`/pokemon/${nextPokemon?.id}`}
            className="flex items-center gap-2 font-bold hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <span className="hidden md:inline">{nextPokemon?.name}</span>
            <span>#{nextPokemon?.id}</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
