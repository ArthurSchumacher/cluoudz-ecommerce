import { Input } from "@nextui-org/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <>
      <Input
        startContent={<FaSearch className="text-foreground" />}
        placeholder="Hoje você precisa de um(a)..."
        size="sm"
        radius="sm"
        classNames={{
          inputWrapper: ["shadow-md", "bg-background", "!cursor-text"],
          input: "text-foreground",
        }}
      />
    </>
  );
}

export default SearchInput;
