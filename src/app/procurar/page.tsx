import React from "react";
import * as queries from "@/queries";
import Container from "@/components/common/Container";
import ProductsList from "@/components/products/ProductsList";

interface SearchPageProps {
  searchParams: {
    category?: string;
    product?: string;
    skip?: string;
    page?: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { category, product, skip, page } = searchParams;
  const products = await queries.allProducts(category, product, skip, page);

  return (
    <main className="w-full pb-16 bg-background">
      <Container>
        <div>
          <ProductsList products={products} title="Procurar" />
        </div>
      </Container>
    </main>
  );
}

export default SearchPage;
