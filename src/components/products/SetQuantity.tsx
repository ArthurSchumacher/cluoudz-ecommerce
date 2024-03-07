"use client";

import { Input } from "@nextui-org/react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface SetQuantityProps {
  cartCounter?: boolean;
  quantity: number;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

function SetQuantity({
  cartCounter,
  quantity,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: SetQuantityProps) {
  return (
    <div className="flex gap-4 items-center">
      {cartCounter ? <p className="text-base font-bold">Quantidade:</p> : null}
      <div className="flex gap-4 items-center justify-center max-w-[95px] text-base border border-content2 bg-content1 sm:p-2 p-1 rounded-md hover:border-foreground">
        <button onClick={handleQuantityDecrease} type="submit">
          <FaMinus size={12} />
        </button>
        <div>{quantity}</div>
        <button onClick={handleQuantityIncrease} type="submit">
          <FaPlus size={12} />
        </button>
      </div>
    </div>
  );
}

export default SetQuantity;
