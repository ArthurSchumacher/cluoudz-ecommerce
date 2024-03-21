"use client";

import React, { ChangeEvent, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, UserDto } from "@/types/user";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { paths } from "@/paths";
import * as actions from "@/actions";
import toast from "react-hot-toast";
import { LuDot } from "react-icons/lu";
import { formatCpf } from "@/utils/formatCpf";
import {
  formatPhoneNumber,
  normalizePhoneNumber,
} from "@/utils/formatPhoneNumber";

interface ClientProfileProps {
  user: User;
}

const updateUserSchema = z.object({
  name: z.string().min(4, { message: "This field has to be filled" }),

  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email("This is not a valid email."),

  phone: z
    .string()
    .min(11, { message: "You must provide a valid phone number." }),

  password: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s)/,
      "You must provide a strong password."
    ),

  c_password: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s)/,
      "You must provide a strong password."
    ),
});

type UpdateUserFormFields = z.infer<typeof updateUserSchema>;

function ClientProfile({ user }: ClientProfileProps) {
  const [phone, setPhone] = useState(user.phone);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormFields>({
    resolver: zodResolver(updateUserSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateUserFormFields> = async (data) => {
    try {
      if (data.password === data.c_password) {
        const userDto: UserDto = {
          name: data.name,
          email: data.email,
          cpf: user.cpf,
          phone: data.phone,
          password: data.password,
          typeUser: 0,
        };

        const updatedUser = await actions.updateProfile(userDto, user.id);

        if (updatedUser) {
          await signOut({
            redirect: false,
          });
          router.replace(paths.signIn());
          toast.success(`Sucesso ao atualizar cadastro.`);
        }
      }
    } catch (error: any) {
      toast.error(`Erro ao atualizar cadastro.`);
    }
  };

  const handlePhoneMask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const normalizedValue = normalizePhoneNumber(value);
    setPhone(normalizedValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <Input
        {...register("name")}
        isInvalid={errors.name ? true : undefined}
        defaultValue={user.name}
        className="bg-content2"
        type="text"
        placeholder="Digite seu nome e sobrenome"
        label="Nome"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content2 antialiased`,
        }}
      />

      {errors.name ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.name.message}
        </p>
      ) : null}

      <Input
        {...register("email")}
        isInvalid={errors.email ? true : undefined}
        defaultValue={user.email}
        className="bg-content2"
        type="text"
        placeholder="Digite seu e-mail"
        label="Email"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content2 antialiased`,
        }}
      />

      {errors.email ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.email.message}
        </p>
      ) : null}

      <div className="flex sm:flex-row flex-col flex-nowrap gap-4">
        <div className="sm:w-1/2 w-full">
          <Input
            {...register("phone")}
            isInvalid={errors.phone ? true : undefined}
            defaultValue={formatPhoneNumber(user.phone)}
            value={phone}
            onChange={handlePhoneMask}
            className="bg-content2"
            type="text"
            placeholder="Digite seu celular"
            label="DDD + Celular"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />

          {errors.phone ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <Input
          isInvalid={undefined}
          defaultValue={formatCpf(user.cpf)}
          isDisabled
          className="bg-content2 sm:w-1/2 w-full"
          type="text"
          label="CPF"
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          radius="sm"
          classNames={{
            input: `placeholder:text-content2 antialiased`,
          }}
        />
      </div>

      <div className="flex sm:flex-row flex-col gap-4">
        <div className="sm:w-1/2 w-full">
          <Input
            {...register("password")}
            isInvalid={errors.password ? true : undefined}
            className="bg-content2"
            type="password"
            placeholder="Sua senha"
            label="Senha"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />
          {errors.password ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="sm:w-1/2 w-full">
          <Input
            {...register("c_password")}
            isInvalid={errors.c_password ? true : undefined}
            className="bg-content2"
            type="password"
            placeholder="Confirme sua senha"
            label="Confirmar a senha"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            radius="sm"
            classNames={{
              input: `placeholder:text-content2 antialiased`,
            }}
          />

          {errors.c_password ? (
            <p className="px-2 text-danger text-sm font-light">
              {errors.c_password.message}
            </p>
          ) : null}
        </div>
      </div>

      <ul className="w-full pl-2 flex flex-col">
        <p className="text-sm pb-2">Padrão de senha:</p>
        <li className="text-xs pl-2 inline-flex items-center">
          <LuDot size={32} />
          Mínimo 8 caracteres
        </li>
        <li className="text-xs pl-2 inline-flex items-center">
          <LuDot size={32} />
          Letra Minúscula
        </li>
        <li className="text-xs pl-2 inline-flex items-center">
          <LuDot size={32} />
          Letra Maiúscula
        </li>
        <li className="text-xs pl-2 inline-flex items-center">
          <LuDot size={32} />
          Números
        </li>
        <li className="text-xs pl-2 inline-flex items-center">
          <LuDot size={32} />
          Carácter especial
        </li>
      </ul>

      <div className="sm:ml-auto">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="text-neutral-50 sm:w-64 w-full"
          color="primary"
          size="lg"
          radius="sm"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default ClientProfile;
