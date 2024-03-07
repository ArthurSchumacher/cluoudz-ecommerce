"use client";

import { SingleProduct } from "@/types/product";
import { Image } from "@nextui-org/react";
import React from "react";
import { FaFire } from "react-icons/fa";

interface ProductImageProps {
  product: SingleProduct;
  sale: boolean;
}

function ProductImage({ product, sale }: ProductImageProps) {
  return (
    <div className="grid grid-cols-1 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="col-span-1 relative aspect-square mx-auto">
        {sale ? (
          <div className="absolute top-0 left-0 bg-secondary p-1 sm:p-2 rounded-md z-30 uppercase">
            <p className="inline-flex items-center justify-center gap-1 text-content1 text-xs sm:text-base">
              <FaFire size={12} />
              Promoção!
            </p>
          </div>
        ) : null}
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
