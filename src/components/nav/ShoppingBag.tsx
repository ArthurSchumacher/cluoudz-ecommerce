import { Button, Link } from "@nextui-org/react";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { paths } from "@/paths";
import { useCart } from "@/hooks/useCart";
import * as queries from "@/queries";

async function ShoppingBag() {
  const cart = await queries.userCart().catch((error) => {
    return undefined;
  });

  return (
    <div className="relative">
      <p className="absolute bottom-0 right-0 bg-primary text-white rounded-full sm:w-6 sm:h-6 w-5 h-5 flex items-center justify-center z-10 sm:text-sm text-xs">
        {(cart && cart._count) || 0}
      </p>
      <Button
        size="lg"
        isIconOnly
        as={Link}
        href={paths.cart()}
        variant="flat"
        className="bg-transparent text-content1"
      >
        <FaShoppingBag size={40} className="sm:block hidden" />
        <FaShoppingBag size={30} className="sm:hidden block" />
      </Button>
    </div>
  );
}

export default ShoppingBag;
