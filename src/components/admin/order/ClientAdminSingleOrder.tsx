"use client";

import { Order } from "@/types/order";
import { SingleProduct } from "@/types/product";
import { Status, StatusDto } from "@/types/status";
import { formatCep } from "@/utils/formatCep";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";

interface ClientAdminSingleOrderProps {
  order: Order;
  products: SingleProduct[];
  status: Status[];
}

const statusSchema = z.object({
  status: z.coerce
    .number()
    .min(1, { message: "Este campo deve ser preenchido." }),
});

type UpdateStatusFields = z.infer<typeof statusSchema>;

function ClientAdminSingleOrder({
  order,
  products,
  status,
}: ClientAdminSingleOrderProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateStatusFields>({
    resolver: zodResolver(statusSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateStatusFields> = async (data) => {
    try {
      const statusDto: StatusDto = {
        statusId: data.status.toString(),
      };

      await actions.adminUpdateOrderStatus(order.id, statusDto);
      toast.success("Sucesso ao alterar status desta ordem!");
      router.back();
    } catch (error) {
      toast.error("Falha ao alterar status.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Select
          {...register("status")}
          isInvalid={errors.status ? true : undefined}
          items={status}
          className="bg-background max-w-xs"
          placeholder="Informe um status"
          label="Status"
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          radius="sm"
          classNames={{
            listbox: ["bg-content2"],
            popoverContent: ["bg-content2"],
            mainWrapper: ["bg-content2"],
          }}
        >
          {(status) => (
            <SelectItem key={status.id} value={status.id}>
              {status.name}
            </SelectItem>
          )}
        </Select>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="text-content2 w-full max-w-xs"
          color="primary"
          size="lg"
          radius="sm"
        >
          Salvar
        </Button>
      </form>
      <div className="py-4">
        <p>
          {order.address.street}, {order.address.number} -{" "}
          {order.address.district}
        </p>
        <p>
          {order.address.city}, {order.address.uf} -{" "}
          {formatCep(order.address.cep.toString())}
        </p>
      </div>
      <div>
        <p>
          <strong>Subtotal:</strong> {formatPrice(Number(order.payment.price))}
        </p>
        <p>
          <strong>Desconto:</strong>{" "}
          {formatPrice(Number(order.payment.discount))}
        </p>
        <p>
          <strong>Preço final:</strong>{" "}
          {formatPrice(Number(order.payment.final_price))}
        </p>
      </div>
      <div className="py-4">
        {products.map((product) => {
          return (
            <div key={product.id} className="grid grid-cols-3">
              <div className="col-span-2 flex items-center gap-4">
                <div className="relative w-[70px] aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-contain"
                  />
                </div>
                <div className="text-content3 sm:text-base text-xs">
                  <p>{truncateText(product.name)}</p>
                  <p>Valor unitário: {formatPrice(Number(product.price))}</p>
                  <p>Quantidade: {product.amount}</p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <p className="text-content3 sm:text-base text-xs">
                  <strong>Total: </strong>
                  {product.amount &&
                    formatPrice(Number(product.price) * product.amount)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ClientAdminSingleOrder;
