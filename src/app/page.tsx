import HomeBanner from "@/components/HomeBanner";
import Container from "@/components/common/Container";
import ProductCard from "@/components/products/ProductCard";
import * as queries from "@/queries";
import { truncateText } from "@/utils/truncateText";

export default async function HomePage() {
  const products = await queries.allProducts();
  return (
    <main className="w-full py-16 text-neutral-100">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="flex items-center flex-row py-16">
          <span className="h-0.5 w-full bg-neutral-400 flex-shrink" />
          <h1 className="text-3xl antialiased text-neutral-900 uppercase px-8 flex-grow text-center font-bold">
            Produtos
          </h1>
          <span className="h-0.5 w-full bg-neutral-400 flex-shrink" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </Container>
    </main>
  );
}
