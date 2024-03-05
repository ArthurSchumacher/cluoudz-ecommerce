import { Product } from "@/types/product";
import React from "react";
import ProductCard from "./ProductCard";
import Title from "../Title";

interface ProductListProps {
  products: Product[];
}

function ProductsList({ products }: ProductListProps) {
  return (
    <>
      <Title label={"Produtos"} isUpperCase />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}

export default ProductsList;
