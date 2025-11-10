import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '../button';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => goToPage(page)}
            className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-110 ${
              currentPage === page
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white scale-110'
                : 'bg-white hover:bg-gray-100 text-foreground border-2 border-primary/20'
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed p-0"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
    // <div className="flex justify-center py-4">
    //   <Pagination>
    //     <PaginationContent>
    //       <PaginationItem>
    //         <button
    //           onClick={() => handlePageChange(currentPage - 1)}
    //           disabled={currentPage <= 1}
    //           className="cursor-pointer"
    //         >
    //           <PaginationPrevious />
    //         </button>
    //       </PaginationItem>
    //       {[...Array(Math.min(5, totalPages))].map((_, index) => {
    //         let pageNumber;
    //         if (totalPages <= 5) {
    //           pageNumber = index + 1;
    //         } else if (currentPage <= 3) {
    //           pageNumber = index + 1;
    //         } else if (currentPage >= totalPages - 2) {
    //           pageNumber = totalPages - 4 + index;
    //         } else {
    //           pageNumber = currentPage - 2 + index;
    //         }
    //         return (
    //           <PaginationItem key={index}>
    //             <button
    //               onClick={() => handlePageChange(pageNumber)}
    //               className={`cursor-pointer ${
    //                 currentPage === pageNumber ? 'font-bold' : ''
    //               }`}
    //             >
    //               <PaginationLink isActive={currentPage === pageNumber}>
    //                 {pageNumber}
    //               </PaginationLink>
    //             </button>
    //           </PaginationItem>
    //         );
    //       })}
    //       {totalPages > 5 && currentPage < totalPages - 2 && (
    //         <>
    //           <PaginationItem>
    //             <PaginationEllipsis />
    //           </PaginationItem>
    //           <PaginationItem>
    //             <button
    //               onClick={() => handlePageChange(totalPages)}
    //               className="cursor-pointer"
    //             >
    //               <PaginationLink>{totalPages}</PaginationLink>
    //             </button>
    //           </PaginationItem>
    //         </>
    //       )}
    //       <PaginationItem>
    //         <button
    //           onClick={() => handlePageChange(currentPage + 1)}
    //           disabled={currentPage >= totalPages}
    //           className="cursor-pointer"
    //         >
    //           <PaginationNext />
    //         </button>
    //       </PaginationItem>
    //     </PaginationContent>
    //   </Pagination>
    // </div>
  );
}
