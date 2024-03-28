"use client";
import { Button, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HomeBanner from "@/components/HomeBanner";
import Container from "@/components/common/Container";
import ProductsList from "@/components/products/ProductsList";
import * as queries from "@/queries";
import { usePathname, useRouter } from "next/navigation";
import { AllProducts } from "@/types/product";

interface ClientHomePageProps {
  searchParams: {
    category?: string;
    product?: string;
    skip?: string;
    page?: string;
  };
}

export default function ClientHomePage({ searchParams }: ClientHomePageProps) {
  const [products, setProducts] = useState<AllProducts>({
    products: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("Destaques");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await queries.allProducts(
          searchParams.category || "",
          searchParams.product || "",
          searchParams.skip || "8",
          searchParams.page || "1"
        );
        setProducts(fetchedProducts);

        if (searchParams.category) {
          const category = await queries.singleCategory(searchParams.category);
          setTitle(category.name);
        }

        router.push(
          `${pathname}?category=${searchParams.category || ""}&product=${
            searchParams.product || ""
          }&size=8&page=${searchParams.page || 1}`
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleNextPage = () => {
    if (currentPage < products.totalPages) {
      router.push(
        `${pathname}?category=${searchParams.category || ""}&product=${
          searchParams.product || ""
        }&size=8&page=${currentPage + 1}`
      );
      setCurrentPage(Number(searchParams.page));
      router.refresh();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(
        `${pathname}?category=${searchParams.category || ""}&product=${
          searchParams.product || ""
        }&size=8&page=${currentPage - 1}`
      );
      setCurrentPage(Number(searchParams.page) - 1);
      router.refresh();
    }
  };

  return (
    <main className="w-full pb-16 bg-background">
      <div>
        <HomeBanner />
      </div>
      <Container>
        <div>
          <ProductsList allProducts={products} title={title} />
        </div>
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
          <p>
            {currentPage} / {products.totalPages}
          </p>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            onPress={handleNextPage}
            disabled={currentPage === products.totalPages}
            isIconOnly
            className="flex items-center justify-center"
          >
            <FaChevronRight size={15} />
          </Button>
        </div>
      </Container>
    </main>
  );
}
