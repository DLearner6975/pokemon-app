'use client';

import * as React from 'react';
import {
  ChevronDown,
  Sparkles,
  X,
  Flame,
  Hash,
  Home,
  Shapes,
  Palette,
  Menu,
  ChevronLeft,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import Image from 'next/image';
import { useFilterContext } from '@/components/context/filter-context';
import {
  pokemonTypes,
  generations,
  habitats,
  shapes,
  colors,
} from '@/components/utils/filter-types';

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  defaultOpen?: boolean;
  isCollapsed?: boolean;
}

const FilterSection = React.memo(function FilterSection({
  title,
  icon,
  options,
  selected,
  onChange,
  defaultOpen = false,
  isCollapsed = false,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const handleToggle = React.useCallback(
    (value: string) => {
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
      onChange(next);
    },
    [selected, onChange],
  );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-b-2 border-border/30 last:border-b-0"
    >
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center py-5 text-base font-bold hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 rounded-lg group',
          isCollapsed ? 'justify-center px-2' : 'justify-between px-3 md:px-5',
        )}
      >
        <div
          className={cn(
            'flex items-center',
            isCollapsed ? 'flex-col gap-1' : 'gap-2 md:gap-3',
          )}
        >
          <div
            className={cn(
              'flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md',
              isCollapsed
                ? 'h-12 w-12 p-2.5 [&_svg]:!text-white'
                : 'hidden md:flex h-10 w-10 md:h-auto md:w-auto md:rounded-none md:bg-none p-2 md:p-0 md:shadow-none',
            )}
          >
            {icon}
          </div>
          {!isCollapsed && (
            <>
              <span className="text-base sm:text-lg transition-all duration-300 font-super-adorable">
                {title}
              </span>
              {selected.length > 0 && (
                <Badge className="ml-1 md:ml-2 h-6 px-2.5 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white border-2 border-white shadow-md animate-in zoom-in duration-300">
                  {selected.length}
                </Badge>
              )}
            </>
          )}
        </div>
        {!isCollapsed && (
          <ChevronDown
            className={cn(
              'h-5 w-5 text-primary transition-all duration-300 group-hover:scale-110 flex-shrink-0',
              isOpen && 'rotate-180',
            )}
          />
        )}
      </CollapsibleTrigger>
      {!isCollapsed && (
        <CollapsibleContent className="px-5 pb-5">
          <div className="space-y-4 pt-3">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <Checkbox
                  id={`${title}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={() => handleToggle(option)}
                  className="h-5 w-5 border-2 border-primary/40 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary data-[state=checked]:to-secondary data-[state=checked]:border-primary shadow-sm"
                />
                <Label
                  htmlFor={`${title}-${option}`}
                  className="text-base font-medium cursor-pointer capitalize text-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 leading-none flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
});

interface PokemonFilterProps {
  onClose?: () => void;
}

export function PokemonFilter({ onClose }: PokemonFilterProps) {
  const { filters, totalActiveFilters, clearFilters, setFilter } =
    useFilterContext();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleTypesChange = React.useCallback(
    (values: string[]) => setFilter('types', values),
    [setFilter],
  );
  const handleGenerationsChange = React.useCallback(
    (values: string[]) => setFilter('generation', values),
    [setFilter],
  );
  const handleHabitatsChange = React.useCallback(
    (values: string[]) => setFilter('habitat', values),
    [setFilter],
  );
  const handleShapesChange = React.useCallback(
    (values: string[]) => setFilter('shape', values),
    [setFilter],
  );
  const handleColorsChange = React.useCallback(
    (values: string[]) => setFilter('color', values),
    [setFilter],
  );

  return (
    <div
      className={cn(
        'border-4 border-primary/20 rounded-3xl bg-card shadow-2xl shadow-primary/10 overflow-hidden transition-all duration-300',
        isCollapsed ? 'w-20 sm:w-24' : 'w-80 sm:w-96 lg:w-full lg:max-w-sm',
      )}
    >
      <div
        className={cn(
          'p-4 sm:p-5 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b-4 border-primary/20 relative',
          isCollapsed && 'p-3',
        )}
      >
        {!isCollapsed ? (
          <>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
              width={100}
              height={100}
              alt="Pokemon"
              className="h-10 sm:h-12 mx-auto mb-2 drop-shadow-md object-contain"
            />
            <Button
              onClick={() => {
                setIsCollapsed(true);
                onClose?.();
              }}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-primary lg:block hidden" />
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-primary lg:hidden block" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <Image
              src="/pikachu-party.png"
              width={100}
              height={100}
              alt="Pikachu"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 sm:border-4 border-primary/30 bg-yellow-400 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
            />
            <Button
              onClick={() => setIsCollapsed(false)}
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Expand filter sidebar"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </Button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
              Filters
            </h2>
            {totalActiveFilters > 0 && (
              <Badge className="ml-1 sm:ml-2 h-6 sm:h-7 px-2 sm:px-3 text-sm sm:text-base font-bold bg-white text-primary border-2 border-white/50 shadow-lg animate-in zoom-in duration-300">
                {totalActiveFilters}
              </Badge>
            )}
          </div>
          {totalActiveFilters > 0 && (
            <SimpleTooltip content="Clear All Filters">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 rounded-full gap-1 sm:gap-1.5"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </SimpleTooltip>
          )}
        </div>
      )}

      <div className="divide-y-2 divide-border/30 bg-white">
        <FilterSection
          title="Type"
          icon={<Flame className="h-6 w-6 text-white md:text-primary" />}
          options={pokemonTypes}
          selected={filters.types}
          onChange={handleTypesChange}
          isCollapsed={isCollapsed}
        />
        <FilterSection
          title="Generation"
          icon={<Hash className="h-6 w-6 text-white md:text-secondary" />}
          options={generations}
          selected={filters.generation}
          onChange={handleGenerationsChange}
          isCollapsed={isCollapsed}
        />
        <FilterSection
          title="Habitat"
          icon={<Home className="h-6 w-6 text-white md:text-accent" />}
          options={habitats}
          selected={filters.habitat}
          onChange={handleHabitatsChange}
          isCollapsed={isCollapsed}
        />
        <FilterSection
          title="Shape"
          icon={<Shapes className="h-6 w-6 text-white md:text-primary" />}
          options={shapes}
          selected={filters.shape}
          onChange={handleShapesChange}
          isCollapsed={isCollapsed}
        />
        <FilterSection
          title="Color"
          icon={<Palette className="h-6 w-6 text-white md:text-secondary" />}
          options={colors}
          selected={filters.color}
          onChange={handleColorsChange}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
}
