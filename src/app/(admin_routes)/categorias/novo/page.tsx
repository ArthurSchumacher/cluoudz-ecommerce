import Title from "@/components/Title";
import CategoryForm from "@/components/admin/category/CategoryForm";
import SmallContainer from "@/components/common/FormContainer";
import React from "react";

function CreateCategoryAdminPage() {
  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Criar" />
        <CategoryForm />
      </SmallContainer>
    </section>
  );
}

export default CreateCategoryAdminPage;
