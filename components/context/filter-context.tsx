'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { Filters } from '../types';
import { getInitialFilters } from '../utils/filter-utils';

interface FilterContextValue {
  filters: Filters;
  debouncedQuery: string;
  totalActiveFilters: number;
  setFilter: <K extends keyof Filters>(category: K, value: Filters[K]) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

const EMPTY_FILTERS: Filters = {
  types: [],
  generation: [],
  abilities: [],
  habitat: [],
  shape: [],
  color: [],
  legendary: false,
  mythical: false,
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const [filters, setFilters] = useState<Filters>(() =>
    getInitialFilters(new URLSearchParams(searchParams?.toString() ?? '')),
  );

  const [debouncedQuery, setDebouncedQuery] = useState('');
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync filter state to URL (skip the initial mount — URL already has the values)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } else if (typeof value === 'boolean' && value) {
        params.set(key, 'true');
      }
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters, pathname, router]);

  const setFilter = useCallback(
    <K extends keyof Filters>(category: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [category]: value }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setDebouncedQuery(query), 300);
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const totalActiveFilters = useMemo(() => {
    let count = 0;
    for (const value of Object.values(filters)) {
      if (Array.isArray(value)) count += value.length;
      else if (value === true) count++;
    }
    return count;
  }, [filters]);

  const value = useMemo<FilterContextValue>(
    () => ({
      filters,
      debouncedQuery,
      totalActiveFilters,
      setFilter,
      clearFilters,
      setSearchQuery,
    }),
    [
      filters,
      debouncedQuery,
      totalActiveFilters,
      setFilter,
      clearFilters,
      setSearchQuery,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}
