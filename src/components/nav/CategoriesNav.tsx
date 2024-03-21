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
    <div className="w-full bg-primary text-content2 sm:block hidden">
      <Container>
        <div className="flex flex-row items-center justify-evenly">
          {categories &&
            categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={paths.search(category.id)}
                  className="text-content2 hover:text-content1 hover:bg-background hover:rounded-b-2xl p-4 cursor-pointer"
                >
                  {category.name}
                </Link>
              );
            })}
        </div>
      </Container>
    </div>
  );
}

export default CategoriesNav;
