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

  return (
    <div className="flex justify-center py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="cursor-pointer"
            >
              <PaginationPrevious />
            </button>
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
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`cursor-pointer ${
                    currentPage === pageNumber ? 'font-bold' : ''
                  }`}
                >
                  <PaginationLink isActive={currentPage === pageNumber}>
                    {pageNumber}
                  </PaginationLink>
                </button>
              </PaginationItem>
            );
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="cursor-pointer"
                >
                  <PaginationLink>{totalPages}</PaginationLink>
                </button>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="cursor-pointer"
            >
              <PaginationNext />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
