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
import { Product, SingleProduct } from "@/types/product";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4;

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

interface ProductFormProps {
  product?: SingleProduct;
}

const productSchema = z.object({
  name: z.string().min(4, { message: "This field has to be filled" }),
  description: z.string().min(1, { message: "This field has to be filled" }),
  price: z.coerce.number().min(1, { message: "This field has to be filled" }),
  stock: z.coerce.number().min(1, { message: "This field has to be filled" }),
  category: z.coerce.number(),
});

type ProductFormFields = z.infer<typeof productSchema>;

function ProductForm({ product }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormFields>({
    resolver: zodResolver(productSchema),
  });
  const router = useRouter();
  const [name, setName] = useState<string>(product ? product.name : "");

  const onSubmit: SubmitHandler<ProductFormFields> = async (data) => {
    try {
      //   const productDto: ProductDto = {
      //     name: data.name,
      //   };

      //   if (!product) {
      //     await actions.createProduct(categoryDto);
      //   }

      //   if (product) {
      //     await actions.updateProduct(product.id.toString(), categoryDto);
      //   }

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

export default ProductForm;
