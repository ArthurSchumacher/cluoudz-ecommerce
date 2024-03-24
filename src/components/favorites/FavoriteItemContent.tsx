"use client";

import { paths } from "@/paths";
import { SingleProduct } from "@/types/product";
import { Button, Link } from "@nextui-org/react";
import React, { SyntheticEvent } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { Image } from "@nextui-org/react";
import { truncateText } from "@/utils/truncateText";
import * as actions from "@/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";

interface FavoriteItemContentProps {
  product: SingleProduct;
}

function FavoriteItemContent({ product }: FavoriteItemContentProps) {
  const router = useRouter();
  const handleDeleteItemFromFavorite = async (e: SyntheticEvent) => {
    e.preventDefault();
    await actions
      .removeFromFavorites(product.id.toString())
      .catch((error: any) => {
        return toast.error(`Erro: ${error.message}`);
      });
    toast.success(`Produto removido com sucesso.`);
    router.refresh();
  };

  const handleAddItemToCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    await actions
      .addToCart({ productId: product.id, amount: 1 })
      .catch((error: any) => {
        return toast.error(`Erro: ${error.message}`);
      });
    toast.success(`Produto adicionado ao carrinho com sucesso.`);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-4 text-xs md:text-sm gap-4 border-t-[1.5px] py-4 items-center">
      <div className="col-span-3 justify-self-start flex gap-2 md:gap-2">
        <div className="flex items-center justify-center gap-x-4">
          <Link href={paths.product(product.id.toString())}>
            <div className="relative w-[70px] aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href={paths.product(product.id.toString())}
            className="text-content3 sm:text-base text-xs"
          >
            {truncateText(product.name)}
          </Link>
        </div>
      </div>
      <div className="justify-self-center flex gap-4">
        <form onSubmit={handleAddItemToCart}>
          <Button isIconOnly className="bg-content2" type="submit">
            <MdAddShoppingCart size={20} />
          </Button>
        </form>
        <form onSubmit={handleDeleteItemFromFavorite}>
          <Button isIconOnly className="bg-content2" type="submit">
            <IoMdTrash size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FavoriteItemContent;
