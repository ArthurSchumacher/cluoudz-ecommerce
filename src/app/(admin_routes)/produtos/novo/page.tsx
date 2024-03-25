import Title from "@/components/Title";
import ProductForm from "@/components/admin/product/ProductForm";
import SmallContainer from "@/components/common/FormContainer";
import React from "react";
import * as queries from "@/queries";

async function CreateProductAdminPage() {
  const categories = await queries.allCategories();

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Criar" />
        <ProductForm categories={categories} />
      </SmallContainer>
    </section>
  );
}

export default CreateProductAdminPage;
