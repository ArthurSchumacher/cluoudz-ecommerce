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
      <div className="flex gap-4 items-center text-base border border-neutral-400 bg-neutral-200 p-2 rounded-md hover:border-neutral-700">
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
