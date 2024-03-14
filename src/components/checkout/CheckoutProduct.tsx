import { SingleProduct } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Image } from "@nextui-org/react";
import React from "react";

interface CheckoutProductProps {
  product: SingleProduct;
}

function CheckoutProduct({ product }: CheckoutProductProps) {
  if (!product.amount) {
    throw new Error("Falha na quantidade de produtos.");
  }

  return (
    <div className="grid grid-cols-4 text-xs md:text-sm gap-4 py-2 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-2">
        <div className="relative w-[70px] aspect-square mr-4">
          <Image
            src={product.image}
            alt={product.name}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-content3 sm:text-base text-xs antialiased">
            {truncateText(product.name)}
          </p>
        </div>
      </div>
      <div className="justify-self-center">
        <p>{product.amount}</p>
      </div>
      <div className="justify-self-end">
        <p className="font-semibold text-content3 antialiased sm:text-base text-xs text-end sm:text-center">
          {formatPrice(product.amount * product.price)}
        </p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
