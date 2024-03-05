"use client";

import { SingleProduct } from "@/types/product";
import { Image } from "@nextui-org/react";
import React from "react";

interface ProductImageProps {
  product: SingleProduct;
}

function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="grid grid-cols-1 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="col-span-1 relative aspect-square mx-auto">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
}

export default ProductImage;
