"use client";

import { Category, CategoryDto } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import * as actions from "@/actions";
import { Product, ProductDto, SingleProduct } from "@/types/product";
import { paths } from "@/paths";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4;

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

interface ProductFormProps {
  product?: SingleProduct;
  categories: Category[];
}

const productSchema = z.object({
  name: z.string().min(4, { message: "Este campo deve ser preenchido." }),
  description: z
    .string()
    .min(1, { message: "Este campo deve ser preenchido." }),
  price: z.string().min(1, { message: "Este campo deve ser preenchido." }),
  stock: z.string().min(1, { message: "Este campo deve ser preenchido." }),
  discount: z.string().min(1, { message: "Este campo deve ser preenchido." }),
  category: z.string().min(1, { message: "Este campo deve ser preenchido." }),
  image: z.custom<any>(),
});

type ProductFormFields = z.infer<typeof productSchema>;

function ProductForm({ product, categories }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormFields>({
    resolver: zodResolver(productSchema),
  });
  const router = useRouter();
  const [name, setName] = useState<string>(product ? product.name : "");
  const [description, setDescription] = useState<string>(
    product ? product.description : ""
  );
  const [price, setPrice] = useState<string>(
    product ? product.price.toString() : ""
  );
  const [stock, setStock] = useState<string>(
    product ? product.stock.toString() : ""
  );
  const [discount, setDiscount] = useState<string>(
    product ? product.discount.toString() : "0"
  );
  const [isSelected, setIsSelected] = React.useState<boolean>(
    product ? product.sale : false
  );

  const onSubmit: SubmitHandler<ProductFormFields> = async (data) => {
    try {
      if (!product) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("stock", data.stock.toString());
        formData.append("sale", isSelected.toString());
        formData.append("discount", data.discount.toString());
        formData.append("categoryId", data.category.toString());

        formData.append("image", data.image[0]);

        const req = await actions.createProduct(formData);
        if (req) {
          router.back();
        }
      }

      if (product) {
        const productDto: ProductDto = {
          name: data.name,
          price: data.price,
          description: data.description,
          stock: data.stock,
          sale: isSelected.toString(),
          discount: data.discount,
          categoryId: data.category,
        };

        const req = await actions.updateProduct(
          product.id.toString(),
          productDto
        );

        if (req) {
          router.back();
        }
      }
    } catch (error) {
      toast.error("Falha ao criar/alterar produto.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4"
      encType="multipart/form-data"
    >
      <Input
        {...register("name")}
        isInvalid={errors.name ? true : undefined}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Digite o nome"
        className="bg-content2"
        label="Nome"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content3 antialiased`,
        }}
      />

      {errors.name ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.name.message}
        </p>
      ) : null}

      <Textarea
        {...register("description")}
        isInvalid={errors.description ? true : undefined}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        label="Descrição"
        className="bg-content2"
        minRows={3}
        maxRows={12}
        type="text"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          label: ["bg-background", "text-md"],
        }}
      />

      {errors.description ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.description.message}
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <Select
            {...register("category")}
            isInvalid={errors.category ? true : undefined}
            items={categories}
            className="bg-content2"
            placeholder="Informe uma categoria"
            label="Categoria"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              listbox: ["bg-content2"],
              popoverContent: ["bg-content2"],
            }}
          >
            {(category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            )}
          </Select>

          {errors.category ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.category.message}
            </p>
          ) : null}
        </div>
        <div className="w-full sm:w-1/3">
          <Input
            {...register("price")}
            isInvalid={errors.price ? true : undefined}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Digite o valor"
            className="bg-content2"
            label="Preço"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content3 antialiased`,
            }}
          />

          {errors.price ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.price.message}
            </p>
          ) : null}
        </div>
        <div className="w-full sm:w-1/3">
          <Input
            {...register("stock")}
            isInvalid={errors.stock ? true : undefined}
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
            }}
            placeholder="Digite a quantidade"
            className="bg-content2"
            label="Estoque"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content3 antialiased`,
            }}
          />

          {errors.stock ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.stock.message}
            </p>
          ) : null}
        </div>
      </div>

      <Switch isSelected={isSelected} onValueChange={setIsSelected}>
        Promoção
      </Switch>

      {isSelected ? (
        <Input
          {...register("discount")}
          isInvalid={errors.discount ? true : undefined}
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
          placeholder="Digite a porcentagem"
          className="bg-content2"
          label="Desconto (%)"
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          radius="sm"
          classNames={{
            input: `placeholder:text-content3 antialiased`,
          }}
        />
      ) : null}

      {!product ? (
        <>
          <label>Imagem</label>
          <input
            {...register("image")}
            accept=".png, .jpeg"
            type="file"
            id="image"
            className="block w-full text-sm text-content1 border border-neutral-400 rounded-lg cursor-pointer bg-neutral-50 shadow-sm focus:outline-none file:mr-4 file:p-3 file:rounded-l-md file:bg-neutral-300 file:border-none file:text-sm file:antialiased file:font-light file:cursor-pointer file:hover:bg-neutral-200"
          />
        </>
      ) : null}

      <div className="sm:ml-auto">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="text-content2 sm:w-64 w-full"
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
