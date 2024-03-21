"use client";
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import * as actions from "@/actions";

function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search}>
      <Input
        startContent={<FaSearch className="text-foreground" />}
        placeholder="Hoje você precisa de um(a)..."
        defaultValue={searchParams.get("product") || ""}
        variant="bordered"
        name="product"
        size="sm"
        radius="sm"
        classNames={{
          inputWrapper: ["shadow-md", "bg-content2", "!cursor-text"],
          input: "text-foreground",
        }}
      />
    </form>
  );
}

export default SearchInput;
