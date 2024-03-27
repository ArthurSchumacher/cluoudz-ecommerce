"use client";
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import * as actions from "@/actions";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { SearchDto } from "@/actions/search/search";

interface SearchInputProps {
  category?: string;
}

const searchSchema = z.object({
  product: z.string(),
  category: z
    .union([z.string().length(0), z.string().min(4)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

type SearchFormFields = z.infer<typeof searchSchema>;

function SearchInput({ category }: SearchInputProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormFields>({
    resolver: zodResolver(searchSchema),
  });
  const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<SearchFormFields> = async (data) => {
    try {
      const searchDto: SearchDto = {
        product: data.product,
        category: searchParams.get("category"),
      };
      await actions.search(searchDto);
    } catch (error) {
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("product")}
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
