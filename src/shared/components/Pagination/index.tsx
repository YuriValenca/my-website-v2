import { PaginationWrapper, PageButton, Ellipsis } from "./style";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const Pagination = ({
  currentPage,
  itemsPerPage = 20,
  totalResults,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (operation: "prev" | "next") => {
    if (operation === "prev" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (operation === "next" && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <PaginationWrapper>
      <PageButton onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
        ‹
      </PageButton>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <Ellipsis key={`ellipsis-${index}`}>…</Ellipsis>
        ) : (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        )
      )}

      <PageButton onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
        ›
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
