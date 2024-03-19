"use client";
import { paths } from "@/paths";
import { Address } from "@/types/address";
import { formatCep } from "@/utils/formatCep";
import { Card, CardFooter, CardHeader, Link } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

interface AddressSidebarProps {
  addresses: Address[];
  address: Address;
  onSelect: (address: Address) => void;
}

function AddressSidebar({ addresses, address, onSelect }: AddressSidebarProps) {
  const [sidebar, setSidebar] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current && !node.current.contains(e.target as Node)) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <Link
        className="sm:text-xl text-lg text-secondary cursor-pointer"
        onClick={handleOpenSidebar}
      >
        Alterar endereço
      </Link>

      <div
        className={`w-full h-dvh z-40 bg-foreground/25 ${
          sidebar ? "fixed top-0 left-0" : "hidden"
        }`}
      >
        <div
          ref={node}
          className={`w-full sm:max-w-xl max-w-[90%] h-dvh bg-background p-4 z-50 ml-auto`}
        >
          <p className="text-2xl antialiased font-semibold text-primary py-4 border-b border-primary">
            Alterar endereço
          </p>

          {addresses.map((address, index) => (
            <Card
              isPressable
              onClick={() => {
                onSelect(address);
                setSidebar(!sidebar);
              }}
              key={address.id}
              radius="sm"
              className="my-4 w-full border-1 border-content2 bg-background text-content3 shadow-md"
            >
              <CardHeader className="flex flex-row justify-between items-center -mb-4">
                <p className="sm:text-xl text-base">Endereço {index + 1}</p>
              </CardHeader>
              <CardFooter className="flex-col items-start">
                <p className="text-sm antialiased font-light text-start">
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

          <div className="flex items-center justify-center py-4">
            <Link
              href={paths.createAddress()}
              className="sm:text-base text-sm antialiased font-semibold text-primary inline-flex items-center justify-center gap-4"
            >
              <FaPlus size={20} />
              Criar novo endereço
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressSidebar;
