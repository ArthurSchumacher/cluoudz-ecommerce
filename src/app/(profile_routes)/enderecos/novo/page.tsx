import Title from "@/components/Title";
import SmallContainer from "@/components/common/SmallContainer";
import AddressForm from "@/components/profile/AddressForm";
import React from "react";

function NewAddressPage() {
  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Cadastrar" />
        <AddressForm />
      </SmallContainer>
    </section>
  );
}

export default NewAddressPage;
