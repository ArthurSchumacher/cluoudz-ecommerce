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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const router = useRouter();

  const handleOpen = (address: Address) => {
    setSelectedAddress(address);
    onOpen();
  };

  const deleteAddress = async () => {
    try {
      if (!selectedAddress) {
        throw new Error("Endereço vazio.");
      }

      await actions.deleteAddress(selectedAddress.id);
      onClose();
      router.refresh();
    } catch (error) {
      throw new Error("Erro ao deletar endereço");
    }
  };

  return (
    <>
      <Card
        isPressable
        radius="sm"
        className="py-4 w-full h-full shadow-sm border-1 border-content2 bg-content1 text-content3"
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
          className="my-4 w-full border-1 border-content2 bg-content1 text-content3 shadow-md"
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
              <Link
                className="text-danger cursor-pointer"
                onPress={() => handleOpen(address)}
              >
                <FaDeleteLeft size={25} />
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

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deletar item
              </ModalHeader>
              <ModalBody>
                {selectedAddress && (
                  <>
                    <p>
                      {selectedAddress.street}, {selectedAddress.number} -{" "}
                      {selectedAddress.district}
                    </p>
                    <p>{selectedAddress.complement}</p>
                    <p>
                      {selectedAddress.city}, {selectedAddress.uf.toUpperCase()}{" "}
                      - {formatCep(selectedAddress.cep.toString())}
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="ghost" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onPress={deleteAddress}>
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

export default ClientProfileAddresses;
