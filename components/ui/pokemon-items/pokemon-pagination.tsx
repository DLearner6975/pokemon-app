import { useState, useEffect } from 'react';
import { Button } from '../button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Show first page and ellipsis if needed */}
        {totalPages > 10 && currentPage > 6 && (
          <>
            <Button
              onClick={() => goToPage(1)}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-110 bg-white hover:bg-gray-100 text-foreground border-2 border-primary/20"
            >
              1
            </Button>
            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="text-2xl font-black tracking-wider">•••</span>
            </div>
          </>
        )}

        {/* Main page numbers */}
        {[...Array(Math.min(10, totalPages))].map((_, index) => {
          let pageNumber;
          if (totalPages <= 10) {
            pageNumber = index + 1;
          } else if (currentPage <= 6) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 5) {
            pageNumber = totalPages - 9 + index;
          } else {
            pageNumber = currentPage - 4 + index;
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
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Show ellipsis and last page if needed */}
        {totalPages > 10 && currentPage < totalPages - 5 && (
          <>
            <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-gray-500 hover:text-gray-700 transition-colors">
              <span className="text-2xl font-black tracking-wider">•••</span>
            </div>
            <Button
              onClick={() => goToPage(totalPages)}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-110 bg-white hover:bg-gray-100 text-foreground border-2 border-primary/20"
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
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
}
