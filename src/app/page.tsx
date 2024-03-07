import HomeBanner from "@/components/HomeBanner";
import Container from "@/components/common/Container";
import ProductsList from "@/components/products/ProductsList";
import * as queries from "@/queries";

export default async function HomePage() {
  const products = await queries.allProducts();
  return (
    <main className="w-full pb-16 bg-background">
      <div>
        <HomeBanner />
      </div>
      <Container>
        <div>
          <ProductsList products={products} title="Destaques" />
        </div>
      </Container>
    </main>
  );
}
