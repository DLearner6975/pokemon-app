import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pokeball } from './pokemon-items/pokeball';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <Input
          type="search"
          placeholder="Search for Pokemon..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full h-14 pl-6 pr-24 text-lg bg-gray-50 border-0 rounded-full shadow-sm transition-shadow duration-200 placeholder:text-muted-foreground/60 group-hover:shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Pokeball className="absolute right-2 top-2 h-8 w-8 rounded-full transition-colors" />
      </div>
    </div>
  );
}
