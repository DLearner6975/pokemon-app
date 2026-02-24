'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { SearchBar } from './search-bar';
import type { Pokemon, SimplePokemon } from '../types';
import { filterPokemon } from '../utils/filter-utils';
import { fetchPokemonDetails } from '../utils/pokemon-utils';
import { PokemonGrid } from './pokemon-items/pokemon-grid';
import { PokemonPagination } from './pokemon-items/pokemon-pagination';
import { useWindowSize } from '@/hooks/useWindow';
import { PokemonParticles } from './pokemon-particles';
import { PokemonFilter } from './pokemon-items/pokemon-filter';
import { FilterProvider, useFilterContext } from '../context/filter-context';

interface ProjectDashboardProps {
  initialPokemon: Pokemon[];
  allPokemon: SimplePokemon[];
}

export default function ProjectDashboard(props: ProjectDashboardProps) {
  return (
    <FilterProvider>
      <DashboardContent {...props} />
    </FilterProvider>
  );
}

function DashboardContent({
  initialPokemon,
  allPokemon,
}: ProjectDashboardProps) {
  const { filters, debouncedQuery } = useFilterContext();

  const [pokemonDetails, setPokemonDetails] =
    useState<Pokemon[]>(initialPokemon);

  const detailsRef = useRef(pokemonDetails);
  detailsRef.current = pokemonDetails;

  const [currentPagePokemon, setCurrentPagePokemon] = useState<SimplePokemon[]>(
    [],
  );
  const [pageIndices, setPageIndices] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const windowSize = useWindowSize();

  const itemsPerPage = 24;

  const detailsMap = useMemo(() => {
    const map = new Map<string, Pokemon>();
    for (const p of pokemonDetails) {
      if (p) map.set(p.name, p);
    }
    return map;
  }, [pokemonDetails]);

  const filteredPokemon = useMemo(
    () => filterPokemon(allPokemon, detailsMap, debouncedQuery, filters),
    [allPokemon, detailsMap, debouncedQuery, filters],
  );

  const fetchMissingDetails = useCallback(
    async (pokemonToFetch: SimplePokemon[]) => {
      const currentDetails = detailsRef.current;
      const seen = new Set(currentDetails.map((d) => d?.name));
      const missingPokemon = pokemonToFetch.filter((p) => !seen.has(p.name));

      if (missingPokemon.length > 0) {
        const newDetails = await Promise.all(
          missingPokemon.map(fetchPokemonDetails),
        );
        const validDetails = newDetails.filter(
          (detail) => detail !== null,
        ) as Pokemon[];
        if (validDetails.length > 0) {
          setPokemonDetails((prev) => [...prev, ...validDetails]);
        }
      }
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await fetchMissingDetails(currentPagePokemon);

      if (cancelled || !pageIndices) return;

      const nextStart = pageIndices.end;
      const nextEnd = Math.min(
        nextStart + itemsPerPage,
        filteredPokemon.length,
      );
      if (nextStart < filteredPokemon.length) {
        const nextPagePokemon = filteredPokemon.slice(nextStart, nextEnd);
        await fetchMissingDetails(nextPagePokemon);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    currentPagePokemon,
    fetchMissingDetails,
    pageIndices,
    filteredPokemon,
    itemsPerPage,
  ]);

  useEffect(() => {
    if (windowSize.width !== undefined) {
      setIsSidebarOpen(windowSize.width >= 768);
    }
  }, [windowSize.width]);

  const handlePageChange = useCallback(
    (startIndex: number, endIndex: number) => {
      setPageIndices((prev) => {
        if (prev && prev.start === startIndex && prev.end === endIndex)
          return prev;
        return { start: startIndex, end: endIndex };
      });
      setCurrentPagePokemon(filteredPokemon.slice(startIndex, endIndex));
    },
    [filteredPokemon],
  );

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
            <PokemonGrid
              currentPagePokemon={currentPagePokemon}
              detailsMap={detailsMap}
            />
          </div>
          <PokemonPagination
            totalItems={filteredPokemon.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
