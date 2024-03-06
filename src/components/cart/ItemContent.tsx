"use client";

import { paths } from "@/paths";
import { SingleProduct } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Link } from "@nextui-org/react";
import React, { SyntheticEvent, useState } from "react";
import * as actions from "@/actions";
import toast from "react-hot-toast";
import { Image } from "@nextui-org/react";
import SetQuantity from "../products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface ItemContentProps {
  item: SingleProduct;
  setSubtotal: (subtotal: number) => void;
}

function ItemContent({ item, setSubtotal }: ItemContentProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(item.amount ? item.amount : 1);
  const {
    handleRemoveProductFromCart,
    handleCartQtyDecrease,
    handleCartQtyIncrease,
  } = useCart();

  const handleDeleteItemFromCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleRemoveProductFromCart({
      productId: item.id,
      amount: item.amount ? item.amount : 1,
    });
    await actions.removeItemFromCart(item.id.toString()).catch((error: any) => {
      return toast.error(`Erro: ${error.message}`);
    });
    toast.success(`Produto removido com sucesso.`);
    router.refresh();
  };

  const handleUpdateAmountFromCart = async (e: SyntheticEvent) => {
    e.preventDefault();
    await actions
      .updateProductAmount({ productId: item.id, amount: quantity })
      .catch((error: any) => {
        return toast.error(`Erro: ${error.message}`);
      });
    toast.success(`Quantidade alterada com sucesso.`);
    router.refresh();
  };

  const handleQtyIncrease = () => {
    if (quantity >= item.stock) return;
    setQuantity(quantity + 1);
    handleCartQtyIncrease({ productId: item.id, amount: quantity });
  };

  const handleQtyDecrease = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
    handleCartQtyDecrease({ productId: item.id, amount: quantity });
  };

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-2">
        <Link href={paths.product(item.id.toString())}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link
            href={paths.product(item.id.toString())}
            className="text-neutral-700 sm:text-base text-xs"
          >
            {truncateText(item.name)}
          </Link>
          <form onSubmit={handleDeleteItemFromCart}>
            <button
              type="submit"
              className="text-neutral-700 antialiased underline sm:text-sm text-xs"
            >
              Remover
            </button>
          </form>
        </div>
      </div>
      <div className="justify-self-center">
        <p className="text-neutral-700 antialiased sm:text-base text-xs text-nowrap">
          {formatPrice(item.price)}
        </p>
      </div>
      <div className="justify-self-center">
        <form onSubmit={handleUpdateAmountFromCart}>
          <SetQuantity
            quantity={quantity}
            handleQuantityDecrease={handleQtyDecrease}
            handleQuantityIncrease={handleQtyIncrease}
          />
        </form>
      </div>
      <div className="justify-self-end">
        <p className="font-semibold text-neutral-700 antialiased sm:text-base text-xs text-end sm:text-center">
          {formatPrice(quantity * item.price)}
        </p>
      </div>
    </div>
  );
}

export default ItemContent;
