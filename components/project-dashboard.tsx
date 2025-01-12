'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { FilterSidebar, Filters } from './filter-sidebar';
import { LoginModal, User } from './login-modal';
import { PokemonPagination } from './pokemon-pagination';
import { PokemonGrid } from './pokemon-grid';
import { LoginHeader } from './login-header';
import { SearchBar } from './search-bar';
import { Pokemon, SimplePokemon } from './types';
import {
  getInitialFilters,
  filterPokemon,
  handleFilterChange,
} from './utils/filter-utils';
import { fetchPokemonDetails } from './utils/pokemon-utils';

interface ProjectDashboardProps {
  initialPokemon: Pokemon[];
  allPokemon: SimplePokemon[];
}

export default function ProjectDashboard({
  initialPokemon,
  allPokemon,
}: ProjectDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pokemonDetails, setPokemonDetails] =
    useState<Pokemon[]>(initialPokemon);
  const [filters, setFilters] = useState<Filters>(
    getInitialFilters(searchParams)
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPagePokemon, setCurrentPagePokemon] = useState<SimplePokemon[]>(
    []
  );

  const itemsPerPage = 12;
  const filteredPokemon = filterPokemon(
    allPokemon,
    pokemonDetails,
    searchQuery,
    filters
  );

  const fetchMissingDetails = useCallback(
    async (pokemonToFetch: SimplePokemon[]) => {
      const missingPokemon = pokemonToFetch.filter(
        (pokemon) =>
          !pokemonDetails.some((detail) => detail?.name === pokemon.name)
      );

      if (missingPokemon.length > 0) {
        const newDetails = await Promise.all(
          missingPokemon.map(fetchPokemonDetails)
        );
        const validDetails = newDetails.filter(
          (detail) => detail !== null
        ) as Pokemon[];
        setPokemonDetails((prev) => [...prev, ...validDetails]);
      }
    },
    [pokemonDetails]
  );

  useEffect(() => {
    fetchMissingDetails(currentPagePokemon);
  }, [currentPagePokemon, fetchMissingDetails]);

  const handleFilterChangeWrapper = useCallback(
    (newFilters: Filters) => {
      handleFilterChange(
        newFilters,
        searchParams,
        setFilters,
        () => {},
        router,
        pathname
      );
    },
    [searchParams, router, pathname]
  );

  const handleLogin = useCallback((user: User) => {
    setUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePageChange = useCallback(
    (startIndex: number, endIndex: number) => {
      const newPagePokemon = filteredPokemon.slice(startIndex, endIndex);
      if (
        JSON.stringify(newPagePokemon) !== JSON.stringify(currentPagePokemon)
      ) {
        setCurrentPagePokemon(newPagePokemon);
      }
    },
    [filteredPokemon, currentPagePokemon]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">
      <FilterSidebar
        onFilterChange={handleFilterChangeWrapper}
        initialFilters={filters}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <SearchBar onSearch={handleSearch} />
          <LoginHeader
            user={user}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onLogout={handleLogout}
          />
        </header>

        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Shannon's Pokemon</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <PokemonGrid
            currentPagePokemon={currentPagePokemon}
            pokemonDetails={pokemonDetails}
          />
        </div>

        <PokemonPagination
          totalItems={filteredPokemon.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLogin}
      />
    </div>
  );
}
