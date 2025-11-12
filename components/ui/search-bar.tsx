import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pokeball } from './pokemon-items/pokeball';
import { Button } from '@/components/ui/button';
import { SearchIcon, Menu } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onOpenSidebar?: () => void;
}

export function SearchBar({ onSearch, onOpenSidebar }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <header className="shrink-0 bg-white/80 backdrop-blur-md border-b-2 border-primary/10 shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-4">
        <Button
          onClick={() => onOpenSidebar?.()}
          className="lg:hidden h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </Button>

        <div className="relative flex-1 max-w-2xl">
          <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            placeholder="Search for Pokemon..."
            className="pl-10 sm:pl-12 h-10 sm:h-12 rounded-full border-2 border-primary/20 focus-visible:ring-primary/50 text-sm sm:text-base bg-white/90"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Pokeball className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md flex-shrink-0" />
      </div>
    </header>
  );
}
