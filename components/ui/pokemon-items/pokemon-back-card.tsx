// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { backgroundColorMap, PokemonCardProps } from '@/components/types';
import { ChevronsDown } from 'lucide-react';
import Link from 'next/link';
import { CardFooter } from '../card';

export default function PokemonBackCard({ details }: PokemonCardProps) {
  const { height, weight, base_experience, color, stats } = details;
  const backgroundColorClass = backgroundColorMap[color?.name ?? 'bg-gray-500'];

  return (
    <div
      className={`${
        backgroundColorClass ?? 'bg-gray-500'
      } text-white rounded-lg p-6 max-w-md h-[350px] absolute inset-0 backface-hidden rotate-y-180`}
    >
      <div className="grid grid-cols-[100px_1fr] gap-6">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-white/70">Height</p>
            <p className="text-lg font-semibold">{height}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">Weight</p>
            <p className="text-lg font-semibold">{weight}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white/70">Base Exp</p>
            <p className="text-lg font-semibold">{base_experience}</p>
          </div>
        </div>
        <div>
          <p className="font-medium mb-3">Stats</p>
          <div className="space-y-1.5 text-sm">
            {stats.map((s, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white/70">{s?.stat?.name}</span>
                <span>{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CardFooter className="justify-center p-4 pt-0">
        <Link
          className="text-white/90 hover:text-white hover:bg-white/10 flex"
          href={`/${details?.id}`}
        >
          More details
          <ChevronsDown className="ml-2 h-4 w-4 animate-bounce" />
        </Link>
      </CardFooter>
    </div>
  );
}
