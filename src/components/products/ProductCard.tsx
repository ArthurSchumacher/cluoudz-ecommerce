"use client";

import { paths } from "@/paths";
import { ProductToFavoriteDto } from "@/types/favorite";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Button, Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { FaFire, FaRegHeart } from "react-icons/fa";
import * as actions from "@/actions";
import { ProductToCartDto } from "@/types/cart";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const session = useSession();

  const handleAddToFavorites = async (e: SyntheticEvent) => {
    e.preventDefault();
    const addItemToFavorites: ProductToFavoriteDto = {
      productId: +product.id,
    };

    if (session.status === "unauthenticated") {
      return router.push(paths.signIn());
    }

    await actions.addToFavorite(addItemToFavorites);
    toast.success("Item adicionado aos favoritos com sucesso.");
  };

  const handleAddToCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (session.status === "unauthenticated") {
      return router.push(paths.signIn());
    }

    await actions
      .addToCart({ productId: +product.id, amount: 1 })
      .catch((error) => {
        return toast.error("Falha ao adicionar item ao carrinho.");
      });
    await actions.revalidateCart();
    toast.success("Item adicionado ao carrinho com sucesso.");
  };

  return (
    <div className="flex flex-col transition-all hover:scale-105">
      <div
        onClick={() => router.push(paths.product(product.id.toString()))}
        className="aspect-square overflow-hidden cursor-pointer p-6 flex flex-col items-center justify-center border-1 border-content3 bg-neutral-200 text-content1 shadow-md rounded-lg relative"
      >
        {product.sale ? (
          <div className="absolute top-0 left-0 bg-secondary m-2 p-1 sm:p-2 rounded-md z-30 uppercase">
            <p className="inline-flex items-center justify-center gap-1 text-content1 text-xs sm:text-base">
              <FaFire size={12} />
              Promoção!
            </p>
          </div>
        ) : null}
        <Button
          onClick={handleAddToFavorites}
          isIconOnly
          className="absolute top-0 right-0 m-2 rounded-full bg-neutral-50 z-30"
          variant="solid"
          type="submit"
        >
          <FaRegHeart size={20} />
        </Button>

        <Image
          src={`${product.image}`}
          alt={`${product.name}`}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="py-2">
        <div className="flex items-center justify-between">
          <p className="text-content3 antialiased sm:text-base text-sm font-semibold">
            {truncateText(product.name)}
          </p>
          <p className="text-content3 antialiased sm:text-base text-sm font-semibold">
            {product.sale
              ? formatPrice(
                  product.price - (product.price * product.discount) / 100
                )
              : formatPrice(product.price)}
          </p>
        </div>
        <p className="text-content3 antialiased sm:text-sm text-xs">
          {truncateText(product.description)}
        </p>
        <Button
          onClick={handleAddToCart}
          className="mt-2 rounded-full"
          variant="ghost"
          color="primary"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;

{
  /* <div
onClick={() => router.push(paths.product(product.id.toString()))}
className="shadow-lg col-span-1 cursor-pointer border-1 border-content3 bg-content2 rounded-md p-2 transition-all hover:scale-105 text-center text-sm"
>
<div className="flex flex-col items-center w-full gap-1">
  <div className="aspect-square overflow-hidden relative w-full mb-4">
    {product.sale ? (
      <div className="absolute top-0 left-0 bg-secondary p-1 sm:p-2 rounded-md z-30 uppercase">
        <p className="inline-flex items-center justify-center gap-1 text-content1 text-xs sm:text-base">
          <FaFire size={12} />
          Promoção!
        </p>
      </div>
    ) : null}
    <Image
      src={`${product.image}`}
      alt={`${product.name}`}
      className="object-contain w-full h-full"
    />
  </div>
  <div className="self-start">
    <p className="text-content3 antialiased sm:text-base text-xs">
      Código: <strong className="text-bold">{product.id}</strong>
    </p>
  </div>
  <div className="self-start text-start py-1">
    <p className="text-content3 antialiased sm:text-base text-sm ">
      {truncateText(product.name)}
    </p>
  </div>
  <div className="self-start text-start py-1">
    <p className="text-secondary antialiased sm:text-2xl text-base font-bold">
      {product.sale
        ? formatPrice(
            product.price - (product.price * product.discount) / 100
          )
        : formatPrice(product.price)}{" "}
      <span className="text-content3 antialiased sm:text-base text-xs font-normal">
        no pix.
      </span>
    </p>
  </div>
  <div className="self-start text-start py-1">
    <p className="text-content3 antialiased sm:text-base text-xs">
      ou <strong>{formatPrice(product.price)}</strong> no cartão de
      crédito.
    </p>
  </div>
</div>
</div> */
}
