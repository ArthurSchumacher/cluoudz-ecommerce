import ClientProfileAddresses from "@/components/profile/ClientProfileAddresses";
import React from "react";
import * as queries from "@/queries";

async function AddressesPage() {
  const addresses = await queries.userAddresses();

  return (
    <div>
      <ClientProfileAddresses addresses={addresses} />
    </div>
  );
}

export default AddressesPage;
