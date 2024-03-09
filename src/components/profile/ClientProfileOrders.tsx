"use client";
import { paths } from "@/paths";
import { Order } from "@/types/order";
import { OrderProduct } from "@/types/orderProduct";
import { Product, SingleProduct } from "@/types/product";
import { formatCep } from "@/utils/formatCep";
import { formatOrderId } from "@/utils/formatOrderId";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import React from "react";

interface ClientProfileOrdersProps {
  orders: Order[];
}

function ClientProfileOrders({ orders }: ClientProfileOrdersProps) {
  return (
    <Accordion
      variant="splitted"
      itemClasses={{
        base: "border border-content2",
      }}
    >
      {orders.map((order) => {
        return (
          <AccordionItem
            key={order.id}
            aria-label={`Pedido #${formatOrderId(order.id)}`}
            title={`Pedido #${formatOrderId(order.id)}`}
          >
            <div className="flex flex-col gap-4">
              {order.orderProduct.map((orderProduct) => {
                return (
                  <div key={orderProduct.id} className="grid grid-cols-3">
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="relative w-[70px] aspect-square">
                        <Image
                          src={orderProduct.product.image}
                          alt={orderProduct.product.name}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-content3 sm:text-base text-xs">
                        <p>{truncateText(orderProduct.product.name)}</p>
                        <p>
                          Valor unitário:{" "}
                          {formatPrice(Number(orderProduct.price))}
                        </p>
                        <p>Quantidade: {orderProduct.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <p className="text-content3 sm:text-base text-xs">
                        <strong>Total: </strong>
                        {formatPrice(
                          Number(orderProduct.price) * orderProduct.amount
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="border-t-[1.5px] border-t-content2 grid grid-cols-3">
                <div className="col-span-2 flex flex-col items-start justify-center py-4 px-4">
                  <p className="text-sm antialiased font-light">
                    {order.address.street}, {order.address.number} -{" "}
                    {order.address.district}
                  </p>
                  <p className="text-sm antialiased font-light">
                    {order.address.complement}
                  </p>
                  <p className="text-sm antialiased font-light">
                    {order.address.city}, {order.address.uf.toUpperCase()} -{" "}
                    {formatCep(order.address.cep.toString())}
                  </p>
                  <p className="text-content3 sm:text-base text-xs pt-4">
                    <strong>Status: </strong>
                    {order.status.name}
                  </p>
                </div>
                <div className="flex flex-col items-end py-4">
                  <p className="text-content3 sm:text-base text-xs text-end text-nowrap">
                    <strong>Subtotal: </strong>
                    {formatPrice(Number(order.payment.price))}
                  </p>
                  <p className="text-content3 sm:text-base text-xs text-end text-nowrap">
                    <strong>Descontos: </strong>
                    {formatPrice(Number(order.payment.discount))}
                  </p>
                  <p className="text-content3 sm:text-base text-xs text-end text-nowrap">
                    <strong>Total: </strong>
                    {formatPrice(Number(order.payment.final_price))}
                  </p>
                </div>
              </div>
            </div>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default ClientProfileOrders;
