import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Filters, FilterSidebarProps } from '../types';
import {
  types,
  generations,
  habitats,
  shapes,
  colors,
} from '../utils/filter-utils';
import { PokemonTitle } from './pokemon-items/pokemon-title';
import { FilterX } from 'lucide-react';

export function FilterSidebar({
  onFilterChange,
  initialFilters,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const handleFilterChange = (category: keyof Filters, value: unknown) => {
    setFilters((prevFilters) => {
      let newValue = value;
      if (['types', 'habitat', 'shape', 'color'].includes(category)) {
        if (Array.isArray(value)) {
          newValue = value.map((v) => {
            if (typeof v === 'string') {
              return v.toLowerCase();
            }
            return v;
          });
        } else if (typeof value === 'string') {
          newValue = value.toLowerCase();
        }
      }
      const newFilters = { ...prevFilters, [category]: newValue };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  return (
    <div className="w-64 bg-white p-4 border-r overflow-y-auto h-screen flex flex-col gap-12">
      <PokemonTitle width={150} height={75} />
      <div>
        <h2 className="text-lg font-semibold mb-4">
          <FilterX className="w-6 h-6 inline-block mr-2" />
          Filters
        </h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="type">
            <AccordionTrigger>Type</AccordionTrigger>
            <AccordionContent>
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={(checked) => {
                      const newTypes = checked
                        ? [...filters.types, type]
                        : filters.types.filter((t) => t !== type);
                      handleFilterChange('types', newTypes);
                    }}
                  />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="generation">
            <AccordionTrigger>Generation</AccordionTrigger>
            <AccordionContent>
              {generations.map((gen) => (
                <div key={gen} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`gen-${gen}`}
                    checked={filters.generation.includes(gen)}
                    onCheckedChange={(checked) => {
                      const newGens = checked
                        ? [...filters.generation, gen]
                        : filters.generation.filter((g) => g !== gen);
                      handleFilterChange('generation', newGens);
                    }}
                  />
                  <Label htmlFor={`gen-${gen}`}>{gen}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="habitat">
            <AccordionTrigger>Habitat</AccordionTrigger>
            <AccordionContent>
              {habitats.map((habitat) => (
                <div key={habitat} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`habitat-${habitat}`}
                    checked={filters.habitat.includes(habitat)}
                    onCheckedChange={(checked) => {
                      const newHabitats = checked
                        ? [...filters.habitat, habitat]
                        : filters.habitat.filter((h) => h !== habitat);
                      handleFilterChange('habitat', newHabitats);
                    }}
                  />
                  <Label htmlFor={`habitat-${habitat}`}>{habitat}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shape">
            <AccordionTrigger>Shape</AccordionTrigger>
            <AccordionContent>
              {shapes.map((shape) => (
                <div key={shape} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`shape-${shape}`}
                    checked={filters.shape.includes(shape)}
                    onCheckedChange={(checked) => {
                      const newShapes = checked
                        ? [...filters.shape, shape]
                        : filters.shape.filter((s) => s !== shape);
                      handleFilterChange('shape', newShapes);
                    }}
                  />
                  <Label htmlFor={`shape-${shape}`}>{shape}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="color">
            <AccordionTrigger>Color</AccordionTrigger>
            <AccordionContent>
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.color.includes(color)}
                    onCheckedChange={(checked) => {
                      const newColors = checked
                        ? [...filters.color, color]
                        : filters.color.filter((c) => c !== color);
                      handleFilterChange('color', newColors);
                    }}
                  />
                  <Label htmlFor={`color-${color}`}>{color}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="legendary"
              checked={filters.legendary}
              onCheckedChange={(checked) =>
                handleFilterChange('legendary', checked)
              }
            />
            <Label htmlFor="legendary">Legendary</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="mythical"
              checked={filters.mythical}
              onCheckedChange={(checked) =>
                handleFilterChange('mythical', checked)
              }
            />
            <Label htmlFor="mythical">Mythical</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
