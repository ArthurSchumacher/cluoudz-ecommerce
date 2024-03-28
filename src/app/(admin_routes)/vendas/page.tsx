import SmallContainer from "@/components/common/FormContainer";
import React from "react";
import * as queries from "@/queries";
import ClientAdminOrders from "@/components/admin/order/ClientAdminOrders";

async function SalesAdminPage() {
  const orders = await queries.adminOrders();

  return (
    <section>
      <SmallContainer>
        <ClientAdminOrders orders={orders} />
      </SmallContainer>
    </section>
  );
}

export default SalesAdminPage;
