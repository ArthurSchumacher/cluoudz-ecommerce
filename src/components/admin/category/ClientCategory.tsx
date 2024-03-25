import React from "react";
import Title from "../../Title";
import { Card, CardBody, Link } from "@nextui-org/react";
import { paths } from "@/paths";
import { FaPlus } from "react-icons/fa";
import { Category } from "@/types/category";
import CategoriesTable from "./CategoriesTable";

interface ClientCategoryProps {
  categories: Category[];
}

function ClientCategory({ categories }: ClientCategoryProps) {
  return (
    <div>
      <Title label="Categorias" isUpperCase />
      <Card
        isPressable
        radius="sm"
        className="py-4 w-full h-full border-1 border-content2 bg-content2 text-content1 shadow-md"
        as={Link}
        href={paths.adminCreateCategory()}
      >
        <CardBody className="flex-col items-center justify-center">
          <FaPlus size={20} />
          Nova Categoria
        </CardBody>
      </Card>
      <CategoriesTable rows={categories} />
    </div>
  );
}

export default ClientCategory;
