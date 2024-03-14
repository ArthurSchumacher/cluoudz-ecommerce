import { paths } from "@/paths";
import { Address } from "@/types/address";
import { formatCep } from "@/utils/formatCep";
import { Link } from "@nextui-org/react";
import React from "react";

interface DeliveryAddressProps {
  address: Address;
}

function DeliveryAddress({ address }: DeliveryAddressProps) {
  if (!address) {
    return (
      <>
        <p className="sm:text-lg text-base font-semibold antialiased">
          Endereço de entrega
        </p>
        <p className="text-base py-2 antialiased">
          Você não possuí um endereço cadastrado.
        </p>
        <p className="text-base py-2 antialiased">
          Clique{" "}
          <Link
            href={paths.createAddress()}
            className="text-secondary text-base antialiased"
          >
            aqui
          </Link>{" "}
          para cadastrar um novo endereço.
        </p>
      </>
    );
  }

  return (
    <>
      <p className="sm:text-lg text-base font-semibold antialiased py-2">
        Endereço de entrega
      </p>
      <p className="sm:text-base text-sm py-1">
        {address.street}, {address.number}
      </p>
      {address.complement && (
        <p className="sm:text-base text-sm py-1">{address.complement}</p>
      )}
      <p className="sm:text-base text-sm py-1">
        {address.district} - {address.city} - {address.uf}
      </p>
      <p className="sm:text-base text-sm py-1">
        CEP: {formatCep(address.cep.toString())}
      </p>

      <hr className="my-4" />

      <p className="sm:text-xl text-lg font-semibold antialiased py-2">
        Prazo de entrega até 1 dia útil.
      </p>
    </>
  );
}

export default DeliveryAddress;
