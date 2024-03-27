"use client";
import { AllProducts } from "@/types/product";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Title from "../Title";
import ClientPagination from "../common/ClientPagination";

interface ProductListProps {
  allProducts: AllProducts;
  title: string;
  category?: string;
  product?: string;
}

function ProductsList({
  allProducts,
  title,
  category,
  product,
}: ProductListProps) {
  return (
    <>
      <Title label={title} isUpperCase />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {allProducts &&
          allProducts.products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
      <ClientPagination
        totalPages={allProducts.totalPages}
        category={category}
        product={product}
      />
    </>
  );
}

export default ProductsList;
