import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pokeball } from './pokemon-items/pokeball';
import { Button } from '@/components/ui/button';
import { SearchIcon, Menu } from 'lucide-react';
// import { Pokeball } from './pokemon-items/pokeball';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <header className="shrink-0 bg-white/80 backdrop-blur-md border-b-2 border-primary/10 shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </button>

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
        {/* <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-md flex-shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 border-black bg-gradient-to-b from-red-500 to-red-600 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white border border-black sm:border-2"></div>
          </div>
        </button> */}
      </div>
    </header>
    // <div className="w-full max-w-3xl mx-auto">
    //   <div className="relative group">
    //     <Input
    //       type="search"
    //       placeholder="Search for Pokemon..."
    //       value={searchQuery}
    //       onChange={handleSearchChange}
    //       className="w-full h-14 pl-6 pr-24 text-lg bg-gray-50 border-0 rounded-full shadow-sm transition-shadow duration-200 placeholder:text-muted-foreground/60 group-hover:shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
    //     />
    //     <Pokeball className="absolute right-2 top-2 h-8 w-8 rounded-full transition-colors" />
    //   </div>
    // </div>
  );
}
