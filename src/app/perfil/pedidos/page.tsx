import Title from "@/components/Title";
import SmallContainer from "@/components/common/FormContainer";
import ClientProfileOrders from "@/components/profile/ClientProfileOrders";
import React from "react";
import * as queries from "@/queries";

async function OrdersPage() {
  const orders = await queries.userOrders();

  for (const order of orders) {
    const orderProducts = order.orderProduct;
    for (const orderProduct of orderProducts) {
      const singleProduct = await queries.singleProduct(
        orderProduct.product.id.toString()
      );
      orderProduct.product.image = singleProduct.image;
    }
  }

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Meus Pedidos" />
        <ClientProfileOrders orders={orders} />
      </SmallContainer>
    </section>
  );
}

export default OrdersPage;
