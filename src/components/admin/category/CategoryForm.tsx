"use client";

import { Category, CategoryDto } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import * as actions from "@/actions";

interface CategoryFormProps {
  category?: Category;
}

const categorySchema = z.object({
  name: z.string().min(1, { message: "This is a required field" }),
});

type CategoryFormFields = z.infer<typeof categorySchema>;

function CategoryForm({ category }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormFields>({
    resolver: zodResolver(categorySchema),
  });
  const router = useRouter();
  const [name, setName] = useState<string>(category ? category.name : "");

  const onSubmit: SubmitHandler<CategoryFormFields> = async (data) => {
    try {
      const categoryDto: CategoryDto = {
        name: data.name,
      };

      if (!category) {
        await actions.createCategory(categoryDto);
      }

      if (category) {
        await actions.updateCategory(category.id, categoryDto);
      }

      router.back();
    } catch (error) {
      toast.error("Falha ao criar/modificar endereço.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <Input
        {...register("name")}
        isInvalid={errors.name ? true : undefined}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="bg-content2"
        placeholder="Digite a categoria"
        label="Nome"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content2 antialiased`,
        }}
      />

      <div className="sm:ml-auto">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="text-neutral-50 sm:w-64 w-full"
          color="primary"
          size="lg"
          radius="sm"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default CategoryForm;
