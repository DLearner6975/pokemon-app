import { useState, useEffect, useRef } from 'react';
import { Button } from '../button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowSize } from '../../../hooks/useWindow';

interface PokemonPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (startIndex: number, endIndex: number) => void;
}

export function PokemonPagination({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PokemonPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { width } = useWindowSize();

  // Determine max pages to show based on screen size
  // xs to sm (< 640px): show min 3, max 5 pages, desktop (>= 640px): show 10 pages
  const maxPagesToShow =
    width !== undefined && width < 640
      ? totalPages <= 2
        ? totalPages
        : Math.min(5, totalPages) // min 3 (if available), max 5 for small screens
      : Math.min(10, totalPages); // max 10 for desktop

  const prevTotalRef = useRef(totalItems);
  useEffect(() => {
    if (prevTotalRef.current !== totalItems) {
      prevTotalRef.current = totalItems;
      setCurrentPage(1);
    }
  }, [totalItems]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    onPageChange(startIndex, endIndex);
  }, [currentPage, itemsPerPage, onPageChange, totalItems]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 pb-4 sm:pb-6">
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed p-0"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Show first page and ellipsis if needed */}
        {totalPages > maxPagesToShow &&
          currentPage > Math.ceil(maxPagesToShow / 2) + 1 && (
            <>
              <Button
                onClick={() => goToPage(1)}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-110 bg-white hover:bg-gray-100 text-foreground border-2 border-primary/20"
                aria-label="First page"
              >
                1
              </Button>
              <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-gray-500 hover:text-gray-700 transition-colors">
                <span className="text-2xl font-black tracking-wider">•••</span>
              </div>
            </>
          )}

        {/* Main page numbers */}
        {[...Array(maxPagesToShow)].map((_, index) => {
          let pageNumber;
          const halfPages = Math.floor(maxPagesToShow / 2);

          if (totalPages <= maxPagesToShow) {
            pageNumber = index + 1;
          } else if (currentPage <= halfPages + 1) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - halfPages) {
            pageNumber = totalPages - maxPagesToShow + index + 1;
          } else {
            pageNumber = currentPage - halfPages + index;
          }
          return (
            <Button
              key={index}
              onClick={() => goToPage(pageNumber)}
              className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-110 ${
                currentPage === pageNumber
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white scale-110'
                  : 'bg-white hover:bg-gray-100 text-foreground border-2 border-primary/20'
              }`}
              aria-label="Page number"
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Show ellipsis and last page if needed */}
        {totalPages > maxPagesToShow &&
          currentPage < totalPages - Math.floor(maxPagesToShow / 2) && (
            <>
              <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-gray-500 hover:text-gray-700 transition-colors">
                <span className="text-2xl font-black tracking-wider">•••</span>
              </div>
              <Button
                onClick={() => goToPage(totalPages)}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-110 bg-white hover:bg-gray-100 text-foreground border-2 border-primary/20"
                aria-label="Total pages"
              >
                {totalPages}
              </Button>
            </>
          )}
      </div>

      <Button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed p-0"
        aria-label="Go to next page"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
}
