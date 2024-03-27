import ClientHomePage from "@/components/ClientHomePage";
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
  return (
    <main className="w-full pb-16 bg-background">
      <ClientHomePage searchParams={searchParams} />
    </main>
  );
}
