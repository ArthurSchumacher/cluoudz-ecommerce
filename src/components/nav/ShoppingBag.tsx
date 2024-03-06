"use client";

import { Button, Link } from "@nextui-org/react";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { paths } from "@/paths";
import { useCart } from "@/hooks/useCart";

function ShoppingBag() {
  const { cartTotalQuantity } = useCart();

  return (
    <div className="relative">
      <p className="absolute bottom-0 right-0 bg-secondary rounded-full px-2 py-1 z-10 text-xs">
        {cartTotalQuantity}
      </p>
      <Button
        size="lg"
        isIconOnly
        as={Link}
        href={paths.cart()}
        variant="flat"
        className="bg-transparent text-neutral-50"
      >
        <FaShoppingBag size={40} className="sm:block hidden" />
        <FaShoppingBag size={20} className="sm:hidden block" />
      </Button>
    </div>
  );
}

export default ShoppingBag;
