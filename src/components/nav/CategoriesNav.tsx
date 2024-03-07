import { Category } from "@/types/category";
import React from "react";
import Container from "../common/Container";
import Link from "next/link";
import { paths } from "@/paths";

interface CategoriesNavProps {
  categories: Category[];
}

function CategoriesNav({ categories }: CategoriesNavProps) {
  return (
    <div className="w-full bg-primary-700 sm:block hidden">
      <Container>
        <div className="flex flex-row items-center justify-evenly">
          {categories &&
            categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="hover:bg-primary-800 hover:rounded-b-2xl p-4 cursor-pointer"
                >
                  <Link
                    href={paths.search(category.id)}
                    className="text-content1"
                  >
                    {category.name}
                  </Link>
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
}

export default CategoriesNav;
