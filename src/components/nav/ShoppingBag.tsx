import { Button, Link } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { FaShoppingBag } from "react-icons/fa";
import * as queries from "@/queries";
import { paths } from "@/paths";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";

async function ShoppingBag() {
  const session = await getServerSession(nextAuthOptions);

  let itemsCount = 0;

  if (session) {
    const cart = await queries.userCart();
    if (cart) {
      itemsCount = cart._count;
    }
  }

  return (
    <div className="relative">
      <p className="absolute bottom-0 right-0 bg-secondary rounded-full px-2 py-1 z-10 text-xs">
        {itemsCount}
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
