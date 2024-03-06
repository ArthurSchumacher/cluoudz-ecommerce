import { Category } from "@/types/category";
import React from "react";
import Container from "../common/Container";
import Link from "next/link";

interface CategoriesNavProps {
  categories: Category[];
}

function CategoriesNav({ categories }: CategoriesNavProps) {
  return (
    <div className="w-full bg-secondary sm:block hidden">
      <Container>
        <div className="flex flex-row items-center justify-evenly">
          {categories &&
            categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="hover:bg-primary hover:rounded-b-2xl p-4 cursor-pointer"
                >
                  <Link
                    href={`/?category=${category.id}`}
                    className="text-neutral-50"
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
