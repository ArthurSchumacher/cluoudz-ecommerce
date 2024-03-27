import HomeBanner from "@/components/HomeBanner";
import ClientPagination from "@/components/common/ClientPagination";
import Container from "@/components/common/Container";
import ProductsList from "@/components/products/ProductsList";
import * as queries from "@/queries";
import { Pagination } from "@nextui-org/react";

interface HomePageProps {
  searchParams: {
    category?: string;
    product?: string;
    skip?: string;
    page?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const products = await queries.allProducts(
    searchParams.category,
    searchParams.product,
    searchParams.skip ? searchParams.skip : "8",
    searchParams.page ? searchParams.page : "1"
  );
  return (
    <main className="w-full pb-16 bg-background">
      <div>
        <HomeBanner />
      </div>
      <Container>
        <div>
          <ProductsList
            allProducts={products}
            title="Destaques"
            category={searchParams.category}
            product={searchParams.product}
          />
        </div>
      </Container>
    </main>
  );
}
