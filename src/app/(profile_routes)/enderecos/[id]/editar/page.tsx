import Title from "@/components/Title";
import SmallContainer from "@/components/common/FormContainer";
import AddressForm from "@/components/profile/AddressForm";
import * as queries from "@/queries";
import React from "react";

interface UpdateAddressPageProps {
  params: {
    id: string;
  };
}

async function UpdateAddressPage({ params }: UpdateAddressPageProps) {
  const address = await queries.singleAddress(params.id);

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Editar" />
        <AddressForm address={address} />
      </SmallContainer>
    </section>
  );
}

export default UpdateAddressPage;
