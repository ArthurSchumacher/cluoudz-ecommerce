import Title from "@/components/Title";
import { paths } from "@/paths";
import { AllProducts, Product } from "@/types/product";
import { Card, CardBody, Link } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import ProductsTable from "./ProductsTable";

interface ClientProductProps {
  products: AllProducts;
}

function ClientProduct({ products }: ClientProductProps) {
  return (
    <>
      <Title label="Produtos" isUpperCase />
      <Card
        isPressable
        radius="sm"
        className="py-4 w-full h-full border-1 border-content2 bg-content2 text-content1 shadow-md"
        as={Link}
        href={paths.adminCreateProduct()}
      >
        <CardBody className="flex-col items-center justify-center">
          <FaPlus size={20} />
          Novo Produto
        </CardBody>
      </Card>
      <ProductsTable rows={products} />
    </>
  );
}

export default ClientProduct;
