"use client";
import { AllProducts } from "@/types/product";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Title from "../Title";

interface ProductListProps {
  allProducts: AllProducts;
  title: string;
  category?: string;
  product?: string;
}

function ProductsList({ allProducts, title }: ProductListProps) {
  return (
    <>
      <Title label={title} isUpperCase />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {allProducts &&
          allProducts.products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </>
  );
}

export default ProductsList;
