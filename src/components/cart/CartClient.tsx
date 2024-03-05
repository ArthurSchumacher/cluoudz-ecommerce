import { useCart } from "@/hooks/useCart";
import { paths } from "@/paths";
import { Button, Link, Skeleton } from "@nextui-org/react";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Title from "../Title";
import { useSession } from "next-auth/react";
import { SingleProduct } from "@/types/product";

interface CartClientProps {
  products?: SingleProduct[];
}

function CartClient({ products }: CartClientProps) {
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
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
      <div className="border-t-[1.5px] border-neutral-300 py-4 flex items-center justify-between gap-8">
        <Button size="lg" radius="sm" color="secondary" variant="ghost">
          Limpar carrinho
        </Button>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold antialiased">
            <span>Subtotal</span>
            <span>R$ 1000</span>
          </div>
          <p className="text-neutral-700 antialiased">
            Impostos e frete calculados ao comprar
          </p>
          <Button
            size="lg"
            radius="sm"
            color="primary"
            variant="solid"
            className="w-full py-4"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartClient;
