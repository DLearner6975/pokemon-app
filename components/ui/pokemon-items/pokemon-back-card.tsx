import { backgroundColorMap } from '@/components/types';
import { ChevronsDown } from 'lucide-react';

interface ProductSpecsProps {
  height: string;
  weight: string;
  category: string;
  abilities: string[];
  specialAbility: string;
  showGender?: boolean;
}

export default function PokemonBackCard({
  height = '2\' 07"',
  weight = '37.5 lbs',
  category = 'Vibration',
  abilities = ['Hydration'],
  specialAbility = 'Swift Swim',
  showGender = true,
  color,
}: ProductSpecsProps) {
  const backgroundColorClass = backgroundColorMap[color?.name] || 'bg-gray-300';

  return (
    <div
      className={`${backgroundColorClass} text-white rounded-lg p-6 max-w-md h-[350px] absolute inset-0 backface-hidden rotate-y-180`}
      //   className="bg-sky-500 text-white rounded-lg p-6 max-w-md backface-hidden rotate-y-180"
    >
      <div className="grid grid-cols-2 gap-y-4 mb-4">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <div className="text-sky-100 mb-1">Height</div>
            <div className="font-medium">{height}</div>
          </div>

          <div>
            <div className="text-sky-100 mb-1">Weight</div>
            <div className="font-medium">{weight}</div>
          </div>

          {showGender && (
            <div>
              <div className="text-sky-100 mb-1">Gender</div>
              <div className="flex gap-2 font-medium">
                <span>♂</span>
                <span>♀</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <div className="text-sky-100 mb-1">Category</div>
            <div className="font-medium">{category}</div>
          </div>

          <div>
            <div className="text-sky-100 mb-1">Abilities</div>
            {abilities.map((ability, index) => (
              <div key={index} className="font-medium">
                {ability}
              </div>
            ))}
          </div>

          <div>
            <div className="font-medium">{specialAbility}</div>
          </div>
        </div>
      </div>

      {/* More details link */}
      <div className="text-center">
        <a
          href="#"
          className="text-sky-200 hover:text-white flex flex-col items-center group"
        >
          More details
          <ChevronsDown className="w-4 h-4 mt-1 animate-bounce" />
        </a>
      </div>
    </div>
  );
}
