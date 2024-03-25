"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import * as actions from "@/actions";
import { paths } from "@/paths";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

const columns = [
  { name: "NOME", uid: "name" },
  { name: "PREÇO", uid: "price" },
  { name: "ESTOQUE", uid: "stock" },
  { name: "CATEGORIA", uid: "category" },
  { name: "AÇÕES", uid: "actions" },
];

interface CategoryTableProps {
  rows: Product[];
}

export default function CategoryTable({ rows }: CategoryTableProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  const deleteCategory = async () => {
    try {
      if (!selectedProduct) {
        throw new Error("Categoria vazia.");
      }

      await actions.deleteCategory(selectedProduct.id.toString());
      onClose();
      router.refresh();
    } catch (error) {
      throw new Error("Erro ao deletar endereço");
    }
  };

  const renderCell = React.useCallback(
    (product: Product, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof Product];

      const handleOpen = (product: Product) => {
        setSelectedProduct(product);
        onOpen();
      };

      switch (columnKey) {
        case "name":
          return <p className="flex items-center flex-grow">{product.name}</p>;
        case "price":
          return (
            <p className="flex items-center flex-grow">
              {formatPrice(product.price)}
            </p>
          );
        case "stock":
          return <p className="flex items-center flex-grow">{product.stock}</p>;
        case "category":
          return (
            <p className="flex items-center flex-grow">
              {product.category.name}
            </p>
          );
        case "actions":
          return (
            <div className="flex flex-shrink flex-row justify-end gap-2">
              <Tooltip
                className="text-content2"
                color="warning"
                content="Editar produto"
              >
                <Link
                  className="text-lg text-warning cursor-pointer active:opacity-50"
                  href={paths.adminUpdateCategory(product.id.toString())}
                >
                  <FaEdit size={25} />
                </Link>
              </Tooltip>
              <Tooltip
                color="danger"
                content="Deletar produto"
                className="text-content2"
              >
                <Link
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onPress={() => handleOpen(product)}
                >
                  <FaDeleteLeft size={25} />
                </Link>
              </Tooltip>
            </div>
          );
        default:
          return cellValue instanceof Date
            ? cellValue.toLocaleString()
            : String(cellValue);
      }
    },
    [onOpen, setSelectedProduct]
  );

  return (
    <>
      <Table
        className="py-4"
        aria-label="Table with categories"
        isStriped
        classNames={{
          wrapper: ["bg-content2", "shadow-lg"],
        }}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              className="text-neutral-50"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              className={`${
                column.uid === "actions" ? "flex items-center justify-end" : ""
              }`}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={"Sem categorias para mostrar."}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-content2"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deletar item
              </ModalHeader>
              <ModalBody>
                {selectedProduct && (
                  <>
                    <p>{selectedProduct.name}</p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="ghost"
                  className="hover:text-neutral-50"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button color="danger" onPress={deleteCategory}>
                  Deletar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
