import { Input } from "@nextui-org/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <>
      <Input
        startContent={<FaSearch className="text-primary" />}
        placeholder="Hoje você precisa de um(a)..."
        className="w-full"
        size="sm"
        radius="sm"
      />
    </>
  );
}

export default SearchInput;
