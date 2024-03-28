import { Address } from "@/types/address";
import { SingleProduct } from "@/types/product";
import { formatCep } from "@/utils/formatCep";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";

interface OrderDetailsProps {
  products: SingleProduct[];
  address: Address;
}

function OrderDetails({ products, address }: OrderDetailsProps) {
  const count = products.reduce((acc, product) => {
    if (product.amount) {
      return acc + product.amount;
    }

    return 0;
  }, 0);

  const totalPrice = products.reduce((acc, product) => {
    if (product.amount) {
      return acc + product.price * product.amount;
    }
    return 0;
  }, 0);

  const frete = 20.0;

  return (
    <>
      <p className="sm:text-lg text-base antialiased font-semibold">
        Resumo do pedido
      </p>
      <div className="flex flex-row items-center justify-between">
        <p className="sm:text-base text-sm py-2 antialiased">
          Valor dos produtos{" "}
          <strong className="font-semibold">({count} itens)</strong>:
        </p>
        <p className="sm:text-base text-sm">{formatPrice(totalPrice)}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="sm:text-base text-sm py-2">Prazo de entrega:</p>
        <p className="sm:text-base text-sm">
          até <strong className="font-semibold">1</strong> dia útil.
        </p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="sm:text-base text-sm py-2">
          Entrega para{" "}
          <strong className="font-semibold">
            {address && formatCep(address.cep.toString())}
          </strong>
          :
        </p>
        <p className="sm:text-base text-sm">{formatPrice(frete)}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="sm:text-lg text-base font-bold py-2">Total</p>
        <p className="sm:text-lg text-base font-semibold">
          {formatPrice(totalPrice + frete)}
        </p>
      </div>
    </>
  );
}

export default OrderDetails;
