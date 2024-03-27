import { Button, Pagination } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ClientPaginationProps {
  totalPages: number;
  category?: string;
  product?: string;
}

function ClientPagination({
  totalPages,
  category = "",
  product = "",
}: ClientPaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Atualiza a URL quando a página muda
    router.push(
      `${pathname}?category=${category}&product=${product}&size=${8}&page=${currentPage}`
    );
  }, [currentPage, pathname, router, category, product]);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="flex gap-5 items-center justify-center pt-16">
      <Button
        size="sm"
        variant="solid"
        color="primary"
        onPress={handlePrevPage}
        disabled={currentPage === 1}
        isIconOnly
        className="flex items-center justify-center"
      >
        <FaChevronLeft size={15} />
      </Button>
      <Pagination
        total={totalPages}
        color="primary"
        page={currentPage}
        isCompact
        isDisabled
        classNames={{
          item: ["bg-content2", "text-content1"],
          ellipsis: ["bg-primary"],
        }}
      />
      <Button
        size="sm"
        variant="solid"
        color="primary"
        onPress={handleNextPage}
        disabled={currentPage === totalPages}
        isIconOnly
        className="flex items-center justify-center"
      >
        <FaChevronRight size={15} />
      </Button>
    </div>
  );
}

export default ClientPagination;
