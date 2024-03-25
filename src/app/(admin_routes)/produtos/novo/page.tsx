import Title from "@/components/Title";
import ProductForm from "@/components/admin/product/ProductForm";
import SmallContainer from "@/components/common/FormContainer";
import React from "react";

function CreateProductAdminPage() {
  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Criar" />
        <ProductForm />
      </SmallContainer>
    </section>
  );
}

export default CreateProductAdminPage;
