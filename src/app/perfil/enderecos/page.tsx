import ClientProfileAddresses from "@/components/profile/ClientProfileAddresses";
import React from "react";
import * as queries from "@/queries";
import SmallContainer from "@/components/common/FormContainer";
import Title from "@/components/Title";

async function AddressesPage() {
  const addresses = await queries.userAddresses();

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Meus Endereços" />
        <ClientProfileAddresses addresses={addresses} />
      </SmallContainer>
    </section>
  );
}

export default AddressesPage;
