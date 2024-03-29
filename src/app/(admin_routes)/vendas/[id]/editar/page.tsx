import Title from "@/components/Title";
import SmallContainer from "@/components/common/FormContainer";
import React from "react";
import * as queries from "@/queries";
import ClientAdminSingleOrder from "@/components/admin/order/ClientAdminSingleOrder";
import { SingleProduct } from "@/types/product";
import { formatOrderId } from "@/utils/formatOrderId";

interface AdminUpdateOrderPageProps {
  params: {
    id: string;
  };
}

async function AdminUpdateOrderPage({ params }: AdminUpdateOrderPageProps) {
  const order = await queries.adminSingleOrder(params.id);
  const status = await queries.allStatus();

  let products: SingleProduct[] = [];
  await Promise.all(
    order.orderProduct.map(async (orderProduct) => {
      const product = await queries.singleProduct(
        orderProduct.product.id.toString()
      );
      product.amount = orderProduct.amount;
      products.push(product);
    })
  );

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label={`Pedido #${formatOrderId(order.id)}`} />
        <ClientAdminSingleOrder
          order={order}
          products={products}
          status={status}
        />
      </SmallContainer>
    </section>
  );
}

export default AdminUpdateOrderPage;
