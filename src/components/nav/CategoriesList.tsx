import React from "react";
import * as queries from "@/queries";
import { Category } from "@/types/category";
import { Link } from "@nextui-org/react";

interface CategoriesListProps {
  categories: Category[];
}

function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <>
      <h2 className="text-primary text-md antialiased pb-2 pt-4">Categorias</h2>
      <hr />
      <ul>
        {categories &&
          categories.map((category) => {
            return (
              <li key={category.id}>
                <Link
                  href={`/?category=${category.id}`}
                  className="text-content3 antialiased py-2"
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default CategoriesList;
