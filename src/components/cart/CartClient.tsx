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
import { formatPrice } from "@/utils/formatPrice";
import { Cart } from "@/types/cart";

interface CartClientProps {
  products?: SingleProduct[];
  cart?: Cart;
}

function CartClient({ products, cart }: CartClientProps) {
  const router = useRouter();

  if (!products) {
    return (
      <div className="flex flex-col items-center py-16">
        <div>
          <p className="text-2xl">Seu carrinho está vazio.</p>
        </div>
        <div>
          <Link
            href={paths.home()}
            className="text-content3 flex items-center gap-1 mt-2"
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
        <p className="col-span-2 justify-self-start">Produto</p>
        <p className="justify-self-center">Preço</p>
        <p className="justify-self-center">Quantidade</p>
        <p className="justify-self-end">Total</p>
      </div>
      <div>
        {products.map((item) => {
          return <ItemContent key={item.id} item={item} />;
        })}
      </div>
      <div className="border-t-[1.5px] border-content2 py-4 flex justify-between gap-8">
        <form onSubmit={handleClear}>
          <Button
            type="submit"
            size="sm"
            radius="sm"
            color="secondary"
            variant="ghost"
            className="w-full"
          >
            Limpar carrinho
          </Button>
        </form>
        <div className="text-sm flex flex-col gap-1 items-start">
          <p className="flex justify-between w-full gap-2 sm:text-base text-sm font-semibold antialiased">
            <span>Subtotal</span>
            <span className="text-nowrap">
              {formatPrice(cart ? cart._subtotal : 0)}
            </span>
          </p>
          <p className="text-content3 antialiased pb-2 sm:text-base text-xs text-justify">
            Impostos e frete calculados ao comprar
          </p>
          <Button
            radius="sm"
            color="primary"
            variant="solid"
            className="w-full"
            as={Link}
            href={paths.checkout()}
          >
            Checkout
          </Button>
          <Link
            href={paths.home()}
            className="text-content3 antialiased flex items-center gap-1 pt-2"
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
