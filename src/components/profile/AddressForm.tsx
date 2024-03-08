"use client";

import { paths } from "@/paths";
import { Address, AddressDto } from "@/types/address";
import { formatCep, normalizeCep } from "@/utils/formatCep";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import * as actions from "@/actions";

interface AddressFormProps {
  address?: Address;
}

const addressSchema = z.object({
  cep: z.string().min(1, { message: "This is a required field" }),

  street: z.string().min(1, { message: "This is a required field" }),

  number: z.coerce.number().min(1, { message: "This is a required field" }),

  district: z.string().min(1, { message: "This is a required field." }),

  complement: z.string().nullable(),

  city: z.string().min(1, { message: "This is a required field." }),

  uf: z.string().max(2),
});

type AddressFormFields = z.infer<typeof addressSchema>;

function AddressForm({ address }: AddressFormProps) {
  const [cep, setCep] = useState<string>(
    address ? formatCep(address.cep.toString()) : ""
  );
  const [street, setStreet] = useState<string>(address ? address.street : "");
  const [district, setDistrict] = useState<string>(
    address ? address.district : ""
  );
  const [city, setCity] = useState<string>(address ? address.city : "");
  const [uf, setUf] = useState<string>(address ? address.uf : "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormFields>({
    resolver: zodResolver(addressSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<AddressFormFields> = async (data) => {
    try {
      const cep = Number(data.cep.replace(/\D/, ""));

      const addressDto: AddressDto = {
        cep,
        street: data.street,
        number: data.number,
        district: data.district,
        complement: data.complement ? data.complement : undefined,
        city: data.city,
        uf: data.uf,
      };

      if (!address) {
        await actions.createAddress(addressDto);
      }

      if (address) {
        await actions.updateAddress(address.id, addressDto);
      }

      router.push(paths.addresses());
    } catch (error) {
      toast.error("Falha ao criar/modificar endereço.");
    }
  };

  const checkCEP = async (cep: string) => {
    if (cep.length < 9) return;
    const dataCep = cep.replace(/\D/, "");
    // console.log(dataCep);

    await fetch(`https://viacep.com.br/ws/${dataCep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setStreet(data.logradouro);
        setDistrict(data.bairro);
        setCity(data.localidade);
        setUf(data.uf);
      });
  };

  const handleCepMask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const normalizedValue = normalizeCep(value);
    setCep(normalizedValue);
    checkCEP(normalizedValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <Input
        {...register("cep")}
        isInvalid={errors.cep ? true : undefined}
        value={cep}
        onChange={handleCepMask}
        className="bg-background"
        placeholder="Digite seu CEP"
        label="CEP"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content2 antialiased`,
        }}
      />

      {errors.cep ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.cep.message}
        </p>
      ) : null}

      <div className="flex sm:flex-row flex-col flex-nowrap gap-4 bg-neutral-100">
        <div className="flex-grow">
          <Input
            {...register("street")}
            isInvalid={errors.street ? true : undefined}
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
            className="bg-background"
            type="text"
            placeholder="Digite sua rua"
            label="Rua"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />

          {errors.street ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.street.message}
            </p>
          ) : null}
        </div>

        <div className="flex-shrink sm:w-1/3">
          <Input
            {...register("number")}
            isInvalid={errors.number ? true : undefined}
            defaultValue={address ? address.number.toString() : ""}
            className="bg-background"
            type="text"
            placeholder="Digite o número"
            label="Número"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />

          {errors.number ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.number.message}
            </p>
          ) : null}
        </div>
      </div>

      <Input
        {...register("district")}
        isInvalid={errors.district ? true : undefined}
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
        }}
        className="bg-background"
        type="text"
        placeholder="Digite seu bairro"
        label="Bairro"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content2 antialiased`,
        }}
      />

      {errors.district ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.district.message}
        </p>
      ) : null}

      <Input
        {...register("complement")}
        isInvalid={errors.complement ? true : undefined}
        defaultValue={address ? address.complement : ""}
        className="bg-background"
        type="text"
        placeholder="Digite o complemento"
        label="Complemento"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content2 antialiased`,
        }}
      />

      {errors.complement ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.complement.message}
        </p>
      ) : null}

      <div className="flex sm:flex-row flex-col flex-nowrap gap-4 mb-8 bg-neutral-100">
        <div className="flex-grow">
          <Input
            {...register("city")}
            isInvalid={errors.city ? true : undefined}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className="bg-background"
            type="text"
            placeholder="Digite a cidade"
            label="Cidade"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />

          {errors.city ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.city.message}
            </p>
          ) : null}
        </div>

        <div className="flex-shrink sm:w-1/3">
          <Input
            {...register("uf")}
            isInvalid={errors.uf ? true : undefined}
            value={uf}
            onChange={(e) => {
              setUf(e.target.value);
            }}
            className="bg-background"
            type="text"
            placeholder="UF"
            label="Estado"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />

          {errors.uf ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.uf.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="sm:ml-auto">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="text-neutral-50 sm:w-64 w-full"
          color="success"
          size="lg"
          radius="sm"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default AddressForm;
