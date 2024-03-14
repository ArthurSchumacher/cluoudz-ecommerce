"use client";
import { Address } from "@/types/address";
import { SingleProduct } from "@/types/product";
import { Button, Input, Link } from "@nextui-org/react";
import React, { useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import DeliveryAddress from "./DeliveryAddress";
import OrderDetails from "./OrderDetails";
import AddressSidebar from "./AddressSidebar";

interface CheckoutClientProps {
  products: SingleProduct[];
  addresses: Address[];
}

function ClientCheckout({ products, addresses }: CheckoutClientProps) {
  const [address, setAddress] = useState<Address>(addresses[0]);

  return (
    <section className="grid grid-cols-3 gap-x-8 gap-y-4 sm:pb-16 pb-8">
      <div className="sm:col-span-2 col-span-3">
        <div className="border border-content4 rounded-md bg-content1 p-4 sm:mb-8 mb-4">
          <div className="flex flex-row flex-nowrap gap-x-8"></div>
        </div>
        <div className="grid grid-cols-4 mb-2">
          <p className="col-span-2 justify-self-start text-sm font-semibold">
            Produtos
          </p>
          <p className="justify-self-center text-sm font-semibold">
            Quantidade
          </p>
          <p className="justify-self-end text-sm font-semibold">Total</p>
        </div>
        <div className="border border-content4 rounded-md bg-content1 p-2">
          {products.map((product) => {
            return <CheckoutProduct key={product.id} product={product} />;
          })}
        </div>
      </div>
      <div className="sm:col-span-1 col-span-3 flex flex-col sm:gap-4 gap-2">
        <div className="border border-content4 rounded-md bg-content1 p-4">
          <DeliveryAddress address={address} />
        </div>
        <div className="sm:p-4 p-1 flex items-center justify-center">
          <AddressSidebar
            addresses={addresses}
            address={address}
            onSelect={(address: Address) => {
              setAddress(address);
            }}
          />
        </div>
        <div className="border border-content4 rounded-md bg-content1 p-4">
          <OrderDetails products={products} address={address} />
        </div>
        <form>
          <Button
            size="lg"
            radius="sm"
            className="w-full"
            color="primary"
            variant="solid"
          >
            Pagar agora
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ClientCheckout;
