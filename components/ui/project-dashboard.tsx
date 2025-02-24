"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FilterSidebar } from "./filter-sidebar";
import { SearchBar } from "./search-bar";
import { Filters, Pokemon, SimplePokemon } from "../types";
import {
  getInitialFilters,
  filterPokemon,
  handleFilterChange,
} from "../utils/filter-utils";
import { fetchPokemonDetails } from "../utils/pokemon-utils";
import { LoginManager } from "./login/login-manager";
import { PokemonGrid } from "./pokemon-items/pokemon-grid";
import { PokemonPagination } from "./pokemon-items/pokemon-pagination";
import { useWindowSize } from "@/hooks/useWindow";
import { PokemonParticles } from "./pokemon-particles";

interface ProjectDashboardProps {
  initialPokemon: Pokemon[];
  allPokemon: SimplePokemon[];
}

export default function ProjectDashboard({
  initialPokemon,
  allPokemon,
}: ProjectDashboardProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [pokemonDetails, setPokemonDetails] =
    useState<Pokemon[]>(initialPokemon);

  // Convert ReadonlyURLSearchParams to URLSearchParams
  const searchParamsObj = new URLSearchParams(searchParams?.toString() ?? "");
  const [filters, setFilters] = useState<Filters>(
    getInitialFilters(searchParamsObj)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPagePokemon, setCurrentPagePokemon] = useState<SimplePokemon[]>(
    []
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const windowSize = useWindowSize();

  const itemsPerPage = 24;
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

  useEffect(() => {
    if (windowSize.width !== undefined) {
      setIsSidebarOpen(windowSize.width >= 768); // 768px is typically considered a breakpoint for medium screens
    }
  }, [windowSize.width]);

  const handleFilterChangeWrapper = useCallback(
    (newFilters: Filters) => {
      handleFilterChange(
        newFilters,
        searchParamsObj,
        setFilters,
        () => {},
        router,
        pathname
      );
    },
    [searchParamsObj, router, pathname]
  );

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5] relative">
      <PokemonParticles />
      <FilterSidebar
        onFilterChange={handleFilterChangeWrapper}
        initialFilters={filters}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <SearchBar onSearch={handleSearch} />
          <LoginManager />
        </header>
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
    </div>
  );
}
