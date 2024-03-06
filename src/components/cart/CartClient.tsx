"use client";

import { paths } from "@/paths";
import { Button, Link, Skeleton } from "@nextui-org/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import Title from "../Title";
import { SingleProduct } from "@/types/product";
import ItemContent from "./ItemContent";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";

interface CartClientProps {
  products?: SingleProduct[];
}

function CartClient({ products }: CartClientProps) {
  const { handleClearCart } = useCart();
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (products) {
      let total = 0;
      products.forEach((item) => {
        total += item.price * (item.amount ? item.amount : 1);
      });
      setSubtotal(total);
    }
  }, [products]);

  if (!products) {
    return (
      <div className="flex flex-col items-center py-16">
        <div>
          <p className="text-2xl">Seu carrinho está vazio.</p>
        </div>
        <div>
          <Link
            href={paths.home()}
            className="text-neutral-700 flex items-center gap-1 mt-2"
          >
            <MdArrowBack size={20} />
            <span>Começe a comprar</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleClear = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleClearCart();
    await actions.deleteCart().catch((error: any) => {
      toast.error(`Erro: ${error.message}`);
    });
    toast.success("Carrinho limpo com sucesso.");
    router.refresh();
  };

  return (
    <div className="pb-16">
      <Title label="Meu carrinho" isUpperCase={false} />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
        <p className="col-span-2 justify-self-start">Product</p>
        <p className="justify-self-center">Price</p>
        <p className="justify-self-center">Quantity</p>
        <p className="justify-self-end">Total</p>
      </div>
      <div>
        {products.map((item) => {
          return (
            <ItemContent key={item.id} item={item} setSubtotal={setSubtotal} />
          );
        })}
      </div>
      <div className="border-t-[1.5px] border-neutral-300 py-4 flex justify-between gap-8">
        <form onSubmit={handleClear}>
          <Button
            type="submit"
            size="lg"
            radius="sm"
            color="secondary"
            variant="ghost"
          >
            Limpar carrinho
          </Button>
        </form>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold antialiased">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="text-neutral-700 antialiased pb-2">
            Impostos e frete calculados ao comprar
          </p>
          <Button
            size="lg"
            radius="sm"
            color="primary"
            variant="solid"
            className="w-full"
          >
            Checkout
          </Button>
          <Link
            href={paths.home()}
            className="text-neutral-700 antialiased flex items-center gap-1 pt-2"
          >
            <MdArrowBack />
            <span>Continue comprando</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartClient;
