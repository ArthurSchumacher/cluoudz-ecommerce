import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface SetQuantityProps {
  cartCounter?: boolean;
  quantity: number;
  minValue: number;
  maxValue: number;
  setQuantity: (value: number) => void;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

function SetQuantity({
  cartCounter,
  minValue,
  maxValue,
  quantity,
  setQuantity,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: SetQuantityProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      // If the input is not a number, set the value to the current quantity
      value = quantity;
    } else {
      // Ensure the value is within the specified range
      value = Math.min(Math.max(value, minValue), maxValue);
    }
    setQuantity(value);
  };

  return (
    <div className="flex gap-4 items-center">
      {cartCounter ? <p className="text-base font-bold">Quantidade:</p> : null}
      <Input
        type="number"
        value={quantity.toString()}
        onChange={handleInputChange}
        size="sm"
        radius="sm"
        variant="faded"
        startContent={
          <FaMinus
            size={24}
            className="cursor-pointer"
            onClick={handleQuantityDecrease}
          />
        }
        endContent={
          <FaPlus
            size={24}
            className="cursor-pointer"
            onClick={handleQuantityIncrease}
          />
        }
        className="bg-neutral-50 max-w-24"
        classNames={{
          input: ["text-center"],
          label: ["text-lg"],
        }}
      />
    </div>
  );
}

export default SetQuantity;
