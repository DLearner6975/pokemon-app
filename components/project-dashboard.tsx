'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  Calendar,
  ChevronDown,
  Filter,
  Link2,
  MoreHorizontal,
  Plus,
  Search,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PokemonCard } from './pokemon-card';
import { PokemonCardSkeleton } from './pokemon-card-skeleton';
import { FilterSidebar, Filters } from './filter-sidebar';
import { LoginModal } from './login-modal';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useSearchParams } from 'next/navigation';

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  height: number;
  weight: number;
  base_experience: number;
  is_legendary: boolean;
  is_mythical: boolean;
  habitat?: { name: string };
  shape?: { name: string };
  color?: { name: string };
  generation?: { name: string };
}

interface SimplePokemon {
  name: string;
  url: string;
}

interface ProjectDashboardProps {
  initialPokemon: Pokemon[];
  allPokemon: SimplePokemon[];
}

export default function ProjectDashboard({
  initialPokemon,
  allPokemon,
}: ProjectDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  const [pokemonDetails, setPokemonDetails] =
    useState<Pokemon[]>(initialPokemon);
  const [filters, setFilters] = useState<Filters>({
    types: [],
    generation: [],
    abilities: [],
    stats: {
      hp: { min: 0, max: 255 },
      attack: { min: 0, max: 255 },
      defense: { min: 0, max: 255 },
      speed: { min: 0, max: 255 },
    },
    habitat: [],
    shape: [],
    color: [],
    baseExperience: { min: 0, max: 1000 },
    legendary: false,
    mythical: false,
  });
  const itemsPerPage = 12;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    location: string;
    avatarUrl: string;
  } | null>(null);

  const filteredPokemon = allPokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const details = pokemonDetails.find((p) => p.name === pokemon.name);

    if (!details) return matchesSearch; // If we don't have details yet, only filter by search

    const matchesFilters = () => {
      if (
        filters.types.length > 0 &&
        !details.types.some((t) =>
          filters.types.includes(t.type.name.toLowerCase())
        )
      )
        return false;
      if (
        filters.generation.length > 0 &&
        !filters.generation.includes(
          details.generation?.name.split('-')[1].toUpperCase() || ''
        )
      )
        return false;
      if (
        filters.abilities.length > 0 &&
        !details.abilities.some((a) =>
          filters.abilities.includes(a.ability.name.toLowerCase())
        )
      )
        return false;
      if (
        filters.habitat.length > 0 &&
        !filters.habitat.includes(details.habitat?.name.toLowerCase() || '')
      )
        return false;
      if (
        filters.shape.length > 0 &&
        !filters.shape.includes(details.shape?.name.toLowerCase() || '')
      )
        return false;
      if (
        filters.color.length > 0 &&
        !filters.color.includes(details.color?.name.toLowerCase() || '')
      )
        return false;
      if (
        details.base_experience < filters.baseExperience.min ||
        details.base_experience > filters.baseExperience.max
      )
        return false;
      if (filters.legendary && !details.is_legendary) return false;
      if (filters.mythical && !details.is_mythical) return false;

      const statsMatch = Object.entries(filters.stats).every(
        ([stat, range]) => {
          const pokemonStat = details.stats.find((s) => s.stat.name === stat);
          return (
            pokemonStat &&
            pokemonStat.base_stat >= range.min &&
            pokemonStat.base_stat <= range.max
          );
        }
      );

      return statsMatch;
    };

    return matchesSearch && matchesFilters();
  });

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagePokemon = filteredPokemon.slice(startIndex, endIndex);

  const fetchPokemonDetails = useCallback(async (pokemon: SimplePokemon) => {
    const response = await fetch(pokemon.url);
    const basicDetails = await response.json();

    // Fetch additional details
    const speciesResponse = await fetch(basicDetails.species.url);
    const speciesDetails = await speciesResponse.json();

    return {
      ...basicDetails,
      habitat: speciesDetails.habitat,
      shape: speciesDetails.shape,
      color: speciesDetails.color,
      generation: speciesDetails.generation,
      is_legendary: speciesDetails.is_legendary,
      is_mythical: speciesDetails.is_mythical,
    };
  }, []);

  useEffect(() => {
    const fetchMissingDetails = async () => {
      const missingPokemon = currentPagePokemon.filter(
        (pokemon) =>
          !pokemonDetails.some((detail) => detail.name === pokemon.name)
      );

      if (missingPokemon.length > 0) {
        const newDetails = await Promise.all(
          missingPokemon.map(fetchPokemonDetails)
        );
        setPokemonDetails((prev) => [...prev, ...newDetails]);
      }
    };

    fetchMissingDetails();
  }, [currentPagePokemon, pokemonDetails, fetchPokemonDetails]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(currentPage);
  };

  const handleLogin = (
    username: string,
    password: string,
    avatarUrl: string
  ) => {
    // In a real application, you would validate the credentials here
    // For this example, we'll just set the user as logged in
    setIsLoggedIn(true);
    setUser({ name: 'Anima Agrawal', location: 'U.P, India', avatarUrl });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">
      <FilterSidebar onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div className="flex flex-1 items-center gap-4">
            <Search className="h-5 w-5 text-[#787486]" />
            <Input
              placeholder="Search for Pokemon..."
              className="w-full max-w-md border-0 bg-transparent placeholder:text-[#787486]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5 text-[#787486]" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-[#787486]" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar>
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-[#787486]">{user?.location}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-[#787486]" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsLoginModalOpen(true)}>Log in</Button>
            )}
          </div>
        </header>

        {/* Project Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Shannon's Pokemon</h1>
          </div>
        </div>

        {/* Pokemon Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {currentPagePokemon.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                No Pokemon found matching your search and filters.
              </div>
            ) : (
              currentPagePokemon.map((pokemon) => {
                const details = pokemonDetails.find(
                  (detail) => detail.name === pokemon.name
                );
                const displayImageUrl =
                  details?.sprites?.other?.dream_world?.front_default ||
                  details?.sprites?.front_default;

                return details ? (
                  <PokemonCard
                    key={details.id}
                    name={details.name}
                    number={details.id}
                    imageUrl={displayImageUrl}
                    types={details.types.map((type) => type.type.name)}
                    abilities={details.abilities.map(
                      (ability) => ability.ability.name
                    )}
                  />
                ) : (
                  <PokemonCardSkeleton key={pokemon.name} />
                );
              })
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={createPageURL(currentPage - 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      // href="#"
                      href={createPageURL(pageNumber)}
                      isActive={currentPage === pageNumber}
                      onClick={(e) => {
                        // e.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  href={createPageURL(currentPage + 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
