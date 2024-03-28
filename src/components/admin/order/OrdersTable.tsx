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
import { Order } from "@/types/order";
import { paths } from "@/paths";
import { formatOrderId } from "@/utils/formatOrderId";
import { formatDate } from "@/utils/formatDate";

const columns = [
  { name: "ID", uid: "id" },
  { name: "STATUS", uid: "status" },
  { name: "PRODUTOS", uid: "products" },
  { name: "CRIADA EM", uid: "created_at" },
  { name: "AÇÕES", uid: "actions" },
];

interface OrderTableProps {
  rows: Order[];
}

export default function OrderTable({ rows }: OrderTableProps) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  const renderCell = React.useCallback((order: Order, columnKey: React.Key) => {
    const cellValue = order[columnKey as keyof Order];

    const totalProducts = order.orderProduct.reduce((acc, product) => {
      return (acc += product.amount);
    }, 0);

    switch (columnKey) {
      case "id":
        return (
          <Link
            href={paths.adminUpdateOrder(order.id.toString())}
            className="flex items-center flex-grow text-content1 antialiased"
          >
            {formatOrderId(order.id)}
          </Link>
        );
      case "products":
        return <p className="flex items-center flex-grow">{totalProducts}</p>;
      case "status":
        return (
          <p className="flex items-center flex-grow">{order.status.name}</p>
        );
      case "created_at":
        return (
          <p className="flex items-center flex-grow">
            {formatDate(order.created_at)}
          </p>
        );
      case "actions":
        return (
          <div className="flex flex-shrink flex-row justify-end gap-2">
            <Tooltip
              className="text-content2"
              color="warning"
              content="Editar ordem"
            >
              <Link
                className="text-lg text-warning cursor-pointer active:opacity-50"
                href={paths.adminUpdateOrder(order.id.toString())}
              >
                <FaEdit size={25} />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        // Ensure cellValue is a valid ReactNode
        return typeof cellValue === "string" || typeof cellValue === "number"
          ? cellValue
          : cellValue instanceof Date
          ? cellValue.toLocaleString()
          : null; // or any other fallback value if needed
    }
  }, []);

  return (
    <Table
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
      <TableBody
        items={items}
        emptyContent={"Sem ordens de compra para mostrar."}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
