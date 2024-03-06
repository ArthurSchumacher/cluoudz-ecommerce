import { Product } from "@/types/product";
import React from "react";
import ProductCard from "./ProductCard";
import Title from "../Title";

interface ProductListProps {
  products: Product[];
  title: string;
}

function ProductsList({ products, title }: ProductListProps) {
  return (
    <>
      <Title label={title} isUpperCase />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </>
  );
}

export default ProductsList;
