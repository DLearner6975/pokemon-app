import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
    <div className="flex flex-1 items-center gap-4">
      <Search className="h-5 w-5 text-[#787486]" />
      <Input
        placeholder="Search for Pokemon..."
        className="w-full max-w-md border-0 bg-transparent placeholder:text-[#787486]"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
