'use client';

import { useEffect, useState } from 'react';
import { SearchBar } from './search-bar';
import { PokemonGrid } from './pokemon-items/pokemon-grid';
import { PokemonPagination } from './pokemon-items/pokemon-pagination';
import { useWindowSize } from '@/hooks/useWindow';
import { PokemonParticles } from './pokemon-particles';
import { PokemonFilter } from './pokemon-items/pokemon-filter';
import { usePokemonResults } from '@/lib/pokemon/hooks/use-pokemon-results';

export default function ProjectDashboard() {
  const { totalCount } = usePokemonResults();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width !== undefined) {
      setIsSidebarOpen(windowSize.width >= 768);
    }
  }, [windowSize.width]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="flex h-screen relative z-10">
        <PokemonParticles />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
          shrink-0
        `}
        >
          <div className="sticky top-0 h-screen overflow-y-auto">
            <PokemonFilter onClose={() => setIsSidebarOpen(false)} />
          </div>
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <SearchBar onOpenSidebar={() => setIsSidebarOpen(true)} />

          <div className="flex-1 overflow-auto">
            <PokemonGrid />
          </div>
          <PokemonPagination totalItems={totalCount} />
        </div>
      </div>
    </div>
  );
}
