import ClientCategory from "@/components/admin/category/ClientCategory";
import SmallContainer from "@/components/common/SmallContainer";
import React from "react";
import * as queries from "@/queries";

async function CategoryAdminPage() {
  const categories = await queries.allCategories();

  return (
    <section>
      <SmallContainer>
        <ClientCategory categories={categories} />
      </SmallContainer>
    </section>
  );
}

export default CategoryAdminPage;
