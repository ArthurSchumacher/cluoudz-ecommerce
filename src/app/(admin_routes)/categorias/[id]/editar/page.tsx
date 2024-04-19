import Title from "@/components/Title";
import CategoryForm from "@/components/admin/category/CategoryForm";
import SmallContainer from "@/components/common/SmallContainer";
import React from "react";
import * as queries from "@/queries";

interface UpdateCategoryAdminPageProps {
  params: {
    id: string;
  };
}

async function UpdateCategoryAdminPage({
  params,
}: UpdateCategoryAdminPageProps) {
  const category = await queries.singleCategory(params.id);

  return (
    <section>
      <SmallContainer>
        <Title isUpperCase label="Editar" />
        <CategoryForm category={category} />
      </SmallContainer>
    </section>
  );
}

export default UpdateCategoryAdminPage;
