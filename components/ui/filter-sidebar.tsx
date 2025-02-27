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
import {
  ChevronsLeft,
  ChevronsRight,
  FilterX,
  Flame,
  History,
  Home,
  Shapes,
  Palette,
  Crown,
  Menu,
} from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function FilterSidebar({
  onFilterChange,
  initialFilters,
  isOpen,
  onToggle,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

      // Close mobile sidebar after selection
      if (window.innerWidth < 768) {
        setIsMobileOpen(false);
      }

      return newFilters;
    });
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 md:hidden',
          isMobileOpen ? 'block' : 'hidden'
        )}
        onClick={toggleMobileSidebar}
      />

      <div
        className={cn(
          // Mobile styles
          'fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out md:relative md:transform-none',
          // Desktop styles
          'md:flex md:w-64 md:border-r md:overflow-y-auto md:h-screen md:flex-col md:gap-12',
          // Conditional styles
          {
            'translate-x-0': isMobileOpen,
            '-translate-x-full': !isMobileOpen,
            'md:w-64': isOpen,
            'md:w-16': !isOpen,
          }
        )}
      >
        <PokemonTitle width={150} height={75} />
        <div
          className={cn(
            'h-full overflow-y-auto transition-all duration-300 ease-in-out',
            {
              'w-64': isOpen || isMobileOpen,
              'w-16': !isOpen && !isMobileOpen,
            }
          )}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FilterX className="w-6 h-6" />
              <span className={cn({ hidden: !isOpen && !isMobileOpen })}>
                Filters
              </span>
            </h2>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="type">
                <AccordionTrigger
                  className={cn(
                    'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
                    { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
                  )}
                >
                  <Flame className="h-4 w-4 shrink-0" />
                  <span
                    className={cn('flex-1 text-left', {
                      hidden: !isOpen && !isMobileOpen,
                    })}
                  >
                    Type
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn({ hidden: !isOpen && !isMobileOpen })}
                >
                  {types.map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2 mb-2 pl-6"
                    >
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
                <AccordionTrigger
                  className={cn(
                    'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
                    { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
                  )}
                >
                  <History className="h-4 w-4 shrink-0" />
                  <span
                    className={cn('flex-1 text-left', {
                      hidden: !isOpen && !isMobileOpen,
                    })}
                  >
                    Generation
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn({ hidden: !isOpen && !isMobileOpen })}
                >
                  {generations.map((gen) => (
                    <div
                      key={gen}
                      className="flex items-center space-x-2 mb-2 pl-6"
                    >
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
                <AccordionTrigger
                  className={cn(
                    'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
                    { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
                  )}
                >
                  <Home className="h-4 w-4 shrink-0" />
                  <span
                    className={cn('flex-1 text-left', {
                      hidden: !isOpen && !isMobileOpen,
                    })}
                  >
                    Habitat
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn({ hidden: !isOpen && !isMobileOpen })}
                >
                  {habitats.map((habitat) => (
                    <div
                      key={habitat}
                      className="flex items-center space-x-2 mb-2 pl-6"
                    >
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
                <AccordionTrigger
                  className={cn(
                    'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
                    { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
                  )}
                >
                  <Shapes className="h-4 w-4 shrink-0" />
                  <span
                    className={cn('flex-1 text-left', {
                      hidden: !isOpen && !isMobileOpen,
                    })}
                  >
                    Shape
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn({ hidden: !isOpen && !isMobileOpen })}
                >
                  {shapes.map((shape) => (
                    <div
                      key={shape}
                      className="flex items-center space-x-2 mb-2 pl-6"
                    >
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
                <AccordionTrigger
                  className={cn(
                    'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
                    { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
                  )}
                >
                  <Palette className="h-4 w-4 shrink-0" />
                  <span
                    className={cn('flex-1 text-left', {
                      hidden: !isOpen && !isMobileOpen,
                    })}
                  >
                    Color
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn({ hidden: !isOpen && !isMobileOpen })}
                >
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center space-x-2 mb-2 pl-6"
                    >
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
              <AccordionItem value="special">
                <AccordionTrigger
                  className={cn(
                    'flex items-center justify-start w-full gap-2 py-2 [&[data-state=open]>svg]:rotate-0',
                    { '[&>svg:last-child]:hidden': !isOpen && !isMobileOpen }
                  )}
                >
                  <Crown className="h-4 w-4 shrink-0" />
                  <span
                    className={cn('flex-1 text-left', {
                      hidden: !isOpen && !isMobileOpen,
                    })}
                  >
                    Special
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={cn({ hidden: !isOpen && !isMobileOpen })}
                >
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 mb-2 pl-6">
                      <Checkbox
                        id="legendary"
                        checked={filters.legendary}
                        onCheckedChange={(checked) =>
                          handleFilterChange('legendary', checked)
                        }
                      />
                      <Label htmlFor="legendary">Legendary</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2 pl-6">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 -right-2 z-10 hidden md:flex"
          onClick={onToggle}
        >
          {isOpen ? (
            <ChevronsLeft className="h-4 w-4" />
          ) : (
            <ChevronsRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  );
}
