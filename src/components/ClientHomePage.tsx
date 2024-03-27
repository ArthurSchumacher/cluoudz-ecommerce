"use client";
import { useEffect, useState } from "react";
import HomeBanner from "@/components/HomeBanner";
import Container from "@/components/common/Container";
import ProductsList from "@/components/products/ProductsList";
import * as queries from "@/queries";
import { usePathname, useRouter } from "next/navigation";
import { AllProducts } from "@/types/product";
import ClientPagination from "./common/ClientPagination";

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
  const [title, setTitle] = useState("Destaques");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await queries.allProducts(
          searchParams.category,
          searchParams.product,
          searchParams.skip || "8",
          searchParams.page || "1"
        );
        setProducts(fetchedProducts);

        if (searchParams.category) {
          const category = await queries.singleCategory(searchParams.category);
          setTitle(category.name);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [searchParams]);

  return (
    <main className="w-full pb-16 bg-background">
      <div>
        <HomeBanner />
      </div>
      <Container>
        <div>
          <ProductsList allProducts={products} title={title} />
        </div>

        <ClientPagination
          totalPages={products.totalPages}
          category={searchParams.category}
          product={searchParams.product}
        />
      </Container>
    </main>
  );
}
