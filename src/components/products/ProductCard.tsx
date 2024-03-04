"use client";

import { Product } from "@/types/product";
import { truncateText } from "@/utils/truncateText";
import { Image } from "@nextui-org/react";
import { FaFire } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="shadow-lg col-span-1 cursor-pointer border-1 border-neutral-300 bg-neutral-50 rounded-md p-2 transition-all hover:scale-105 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full mb-4">
          <div className="absolute top-0 left-0 bg-secondary p-2 rounded-md z-10 uppercase">
            <p className="inline-flex items-center justify-center gap-1">
              <FaFire size={12} />
              Desconto!
            </p>
          </div>
          <Image
            src={`${product.image}`}
            alt={`${product.name}`}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="self-start">
          <p className="text-neutral-950 antialiased text-base">
            Código: <strong className="text-bold">{product.id}</strong>
          </p>
        </div>
        <div className="self-start text-start py-1">
          <p className="text-neutral-950 antialiased text-base">
            {truncateText(product.name)}
          </p>
        </div>
        <div className="self-start text-start py-1">
          <p className="text-secondary antialiased text-2xl font-bold">
            R${" "}
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2
            )}{" "}
            <span className="text-neutral-950 antialiased text-base font-normal">
              no pix.
            </span>
          </p>
        </div>
        <div className="self-start text-start py-1">
          <p className="text-neutral-950 antialiased text-base">
            ou <strong>R$ {Number(product.price).toFixed(2)}</strong> no cartão
            de crédito.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
