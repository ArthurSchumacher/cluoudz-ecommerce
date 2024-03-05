import Container from "@/components/common/Container";
import React from "react";
import * as queries from "@/queries";
import ProductDetails from "@/components/products/ProductDetails";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function ProductPage({ params }: ProductPageProps) {
  const product = await queries.singleProduct(params.id);

  return (
    <div className="w-full py-16">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
}

export default ProductPage;
