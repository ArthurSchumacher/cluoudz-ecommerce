import HomeBanner from "@/components/HomeBanner";
import Container from "@/components/common/Container";
import ProductsList from "@/components/products/ProductsList";
import * as queries from "@/queries";

export default async function HomePage() {
  const products = await queries.allProducts();
  return (
    <main className="w-full py-16">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div>
          <ProductsList products={products} />
        </div>
      </Container>
    </main>
  );
}
