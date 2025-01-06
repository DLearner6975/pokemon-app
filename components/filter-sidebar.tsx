import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface Filters {
  types: string[];
  generation: string[];
  abilities: string[];
  stats: {
    hp: { min: number; max: number };
    attack: { min: number; max: number };
    defense: { min: number; max: number };
    speed: { min: number; max: number };
  };
  habitat: string[];
  shape: string[];
  color: string[];
  baseExperience: { min: number; max: number };
  legendary: boolean;
  mythical: boolean;
}

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = React.useState<Filters>({
    types: [],
    generation: [],
    abilities: [],
    stats: {
      hp: { min: 0, max: 255 },
      attack: { min: 0, max: 255 },
      defense: { min: 0, max: 255 },
      speed: { min: 0, max: 255 },
    },
    habitat: [],
    shape: [],
    color: [],
    baseExperience: { min: 0, max: 1000 },
    legendary: false,
    mythical: false,
  })

  const handleFilterChange = (category: keyof Filters, value: any) => {
    setFilters(prevFilters => {
      let newValue = value;
      if (['types', 'habitat', 'shape', 'color'].includes(category)) {
        newValue = Array.isArray(value) ? value.map(v => v.toLowerCase()) : value.toLowerCase();
      }
      const newFilters = { ...prevFilters, [category]: newValue }
      onFilterChange(newFilters)
      return newFilters
    })
  }

  const types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
  const generations = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  const habitats = ['cave', 'forest', 'grassland', 'mountain', 'rare', 'rough-terrain', 'sea', 'urban', 'waters-edge']
  const shapes = ['ball', 'squiggle', 'fish', 'arms', 'blob', 'upright', 'legs', 'quadruped', 'wings', 'tentacles', 'heads', 'humanoid', 'bug-wings', 'armor']
  const colors = ['black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow']

  return (
    <div className="w-64 bg-white p-4 border-r overflow-y-auto h-[calc(100vh-4rem)]">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="type">
          <AccordionTrigger>Type</AccordionTrigger>
          <AccordionContent>
            {types.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.types.includes(type)}
                  onCheckedChange={(checked) => {
                    const newTypes = checked
                      ? [...filters.types, type]
                      : filters.types.filter(t => t !== type)
                    handleFilterChange('types', newTypes)
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
            {generations.map(gen => (
              <div key={gen} className="flex items-center space-x-2">
                <Checkbox
                  id={`gen-${gen}`}
                  checked={filters.generation.includes(gen)}
                  onCheckedChange={(checked) => {
                    const newGens = checked
                      ? [...filters.generation, gen]
                      : filters.generation.filter(g => g !== gen)
                    handleFilterChange('generation', newGens)
                  }}
                />
                <Label htmlFor={`gen-${gen}`}>{gen}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stats">
          <AccordionTrigger>Stats</AccordionTrigger>
          <AccordionContent>
            {Object.entries(filters.stats).map(([stat, range]) => (
              <div key={stat} className="mb-2">
                <Label htmlFor={`${stat}-min`} className="block mb-1 capitalize">{stat}</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id={`${stat}-min`}
                    type="number"
                    min="0"
                    max="255"
                    value={range.min}
                    onChange={(e) => handleFilterChange('stats', { ...filters.stats, [stat]: { ...range, min: parseInt(e.target.value) } })}
                    className="w-20"
                  />
                  <span>to</span>
                  <Input
                    id={`${stat}-max`}
                    type="number"
                    min="0"
                    max="255"
                    value={range.max}
                    onChange={(e) => handleFilterChange('stats', { ...filters.stats, [stat]: { ...range, max: parseInt(e.target.value) } })}
                    className="w-20"
                  />
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="habitat">
          <AccordionTrigger>Habitat</AccordionTrigger>
          <AccordionContent>
            {habitats.map(habitat => (
              <div key={habitat} className="flex items-center space-x-2">
                <Checkbox
                  id={`habitat-${habitat}`}
                  checked={filters.habitat.includes(habitat)}
                  onCheckedChange={(checked) => {
                    const newHabitats = checked
                      ? [...filters.habitat, habitat]
                      : filters.habitat.filter(h => h !== habitat)
                    handleFilterChange('habitat', newHabitats)
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
            {shapes.map(shape => (
              <div key={shape} className="flex items-center space-x-2">
                <Checkbox
                  id={`shape-${shape}`}
                  checked={filters.shape.includes(shape)}
                  onCheckedChange={(checked) => {
                    const newShapes = checked
                      ? [...filters.shape, shape]
                      : filters.shape.filter(s => s !== shape)
                    handleFilterChange('shape', newShapes)
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
            {colors.map(color => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={filters.color.includes(color)}
                  onCheckedChange={(checked) => {
                    const newColors = checked
                      ? [...filters.color, color]
                      : filters.color.filter(c => c !== color)
                    handleFilterChange('color', newColors)
                  }}
                />
                <Label htmlFor={`color-${color}`}>{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="baseExperience">
          <AccordionTrigger>Base Experience</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Input
                id="base-exp-min"
                type="number"
                min="0"
                max="1000"
                value={filters.baseExperience.min}
                onChange={(e) => handleFilterChange('baseExperience', { ...filters.baseExperience, min: parseInt(e.target.value) })}
                className="w-20"
              />
              <span>to</span>
              <Input
                id="base-exp-max"
                type="number"
                min="0"
                max="1000"
                value={filters.baseExperience.max}
                onChange={(e) => handleFilterChange('baseExperience', { ...filters.baseExperience, max: parseInt(e.target.value) })}
                className="w-20"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="legendary"
            checked={filters.legendary}
            onCheckedChange={(checked) => handleFilterChange('legendary', checked)}
          />
          <Label htmlFor="legendary">Legendary</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="mythical"
            checked={filters.mythical}
            onCheckedChange={(checked) => handleFilterChange('mythical', checked)}
          />
          <Label htmlFor="mythical">Mythical</Label>
        </div>
      </div>
    </div>
  )
}

