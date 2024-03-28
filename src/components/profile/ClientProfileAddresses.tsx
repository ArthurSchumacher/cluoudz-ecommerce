"use client";
import React, { useState } from "react";
import SmallContainer from "../common/FormContainer";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { paths } from "@/paths";
import { Address } from "@/types/address";
import { useRouter } from "next/navigation";
import { formatCep } from "@/utils/formatCep";
import * as actions from "@/actions";
import { FaDeleteLeft } from "react-icons/fa6";

interface ClientProfileAddressesProps {
  addresses: Address[];
}

function ClientProfileAddresses({ addresses }: ClientProfileAddressesProps) {
  const router = useRouter();

  return (
    <>
      <Card
        isPressable
        radius="sm"
        className="py-4 w-full h-full border-1 border-content2 bg-content2 text-content1 shadow-md"
        as={Link}
        href={paths.createAddress()}
      >
        <CardBody className="flex-col items-center justify-center">
          <FaPlus size={20} />
          Novo endereço
        </CardBody>
      </Card>

      {addresses.map((address, index) => (
        <Card
          key={address.id}
          radius="sm"
          className="my-4 w-full border-1 border-content2 bg-content2 text-content1 shadow-md"
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <p className="sm:text-xl text-base">Endereço {index + 1}</p>
            <div className="inline-flex items-center gap-2">
              <Link
                href={paths.updateAddress(address.id)}
                className="text-warning"
              >
                <FaEdit size={25} />
              </Link>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start">
            <p className="text-sm antialiased font-light">
              {address.street}, {address.number} - {address.district}
            </p>
            <p className="text-sm antialiased font-light">
              {address.complement}
            </p>
            <p className="text-sm antialiased font-light">
              {address.city}, {address.uf.toUpperCase()} -{" "}
              {formatCep(address.cep.toString())}
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default ClientProfileAddresses;
