import { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Filters, FilterSidebarProps } from '../types';
import {
  types,
  generations,
  habitats,
  shapes,
  colors,
} from '../utils/filter-types';
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
  Menu,
} from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { FilterAccordionItem } from './filter-accordion-item';

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
              <FilterAccordionItem
                value="type"
                icon={Flame}
                title="Type"
                items={types}
                isOpen={isOpen}
                isMobileOpen={isMobileOpen}
                selectedItems={filters.types}
                onItemChange={(newTypes) =>
                  handleFilterChange('types', newTypes)
                }
              />
              <FilterAccordionItem
                value="generation"
                icon={History}
                title="Generation"
                items={generations}
                isOpen={isOpen}
                isMobileOpen={isMobileOpen}
                selectedItems={filters.generation}
                onItemChange={(newGens) =>
                  handleFilterChange('generation', newGens)
                }
              />
              <FilterAccordionItem
                value="habitat"
                icon={Home}
                title="Habitat"
                items={habitats}
                isOpen={isOpen}
                isMobileOpen={isMobileOpen}
                selectedItems={filters.habitat}
                onItemChange={(newHabitats) =>
                  handleFilterChange('habitat', newHabitats)
                }
              />
              <FilterAccordionItem
                value="shape"
                icon={Shapes}
                title="Shape"
                items={shapes}
                isOpen={isOpen}
                isMobileOpen={isMobileOpen}
                selectedItems={filters.shape}
                onItemChange={(newShapes) =>
                  handleFilterChange('shape', newShapes)
                }
              />
              <FilterAccordionItem
                value="color"
                icon={Palette}
                title="Color"
                items={colors}
                isOpen={isOpen}
                isMobileOpen={isMobileOpen}
                selectedItems={filters.color}
                onItemChange={(newColors) =>
                  handleFilterChange('color', newColors)
                }
              />
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
