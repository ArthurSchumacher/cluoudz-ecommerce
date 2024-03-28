import Title from "@/components/Title";
import { Order } from "@/types/order";
import React from "react";
import OrdersTable from "./OrdersTable";

interface ClientAdminOrdersProps {
  orders: Order[];
}

function ClientAdminOrders({ orders }: ClientAdminOrdersProps) {
  return (
    <>
      <Title label="Vendas" isUpperCase />
      <OrdersTable rows={orders} />
    </>
  );
}

export default ClientAdminOrders;
