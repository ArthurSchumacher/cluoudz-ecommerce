import ClientHomePage from "@/components/ClientHomePage";
import * as queries from "@/queries";

interface HomePageProps {
  searchParams: {
    category?: string;
    product?: string;
    skip?: string;
    page?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const fetchedProducts = await queries.allProducts(
    searchParams.category || "",
    searchParams.product || "",
    searchParams.skip || "8",
    searchParams.page || "1"
  );

  if (searchParams.category) {
    const category = await queries.singleCategory(searchParams.category);

    return (
      <main className="w-full pb-16 bg-background">
        <ClientHomePage
          searchParams={searchParams}
          fetchedProducts={fetchedProducts}
          category={category}
        />
      </main>
    );
  }

  return (
    <main className="w-full pb-16 bg-background">
      <ClientHomePage
        searchParams={searchParams}
        fetchedProducts={fetchedProducts}
      />
    </main>
  );
}
