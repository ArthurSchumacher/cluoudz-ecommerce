import Title from "@/components/Title";
import CategoryForm from "@/components/admin/category/CategoryForm";
import SmallContainer from "@/components/common/FormContainer";
import React from "react";
import * as queries from "@/queries";
import ProductForm from "@/components/admin/product/ProductForm";

interface UpdateProductAdminPageProps {
  params: {
    id: string;
  };
}

async function UpdateProductAdminPage({ params }: UpdateProductAdminPageProps) {
  const product = await queries.singleProduct(params.id);

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Editar" />
        <ProductForm product={product} />
      </SmallContainer>
    </section>
  );
}

export default UpdateProductAdminPage;
