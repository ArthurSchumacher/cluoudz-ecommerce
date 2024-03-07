import { Input } from "@nextui-org/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <>
      <Input
        startContent={<FaSearch className="text-primary-800" />}
        placeholder="Hoje você precisa de um(a)..."
        className="w-full"
        size="sm"
        radius="sm"
        classNames={{
          input: "text-primary-800",
        }}
      />
    </>
  );
}

export default SearchInput;
