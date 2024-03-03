"use client";

import { paths } from "@/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s)/,
      "You must provide a strong password."
    ),
});

type SignInFormFields = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        router.replace(paths.home());
      }

      if (!result?.ok) {
        setError("root", { message: "Invalid Credentials!" });
      }
    } catch (error) {
      setError("root", { message: "Invalid Credentials!" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gap-y-4 flex flex-col">
      <Input
        {...register("email")}
        isInvalid={errors.email ? true : undefined}
        type="text"
        placeholder="Digite seu e-mail"
        label="Email"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
      />

      {errors.email ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.email.message}
        </p>
      ) : null}

      <Input
        {...register("password")}
        isInvalid={errors.password ? true : undefined}
        type="password"
        placeholder="Sua senha"
        label="Senha"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
      />

      {errors.password ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.password.message}
        </p>
      ) : null}

      {errors.root ? (
        <div className="w-full p-2 bg-danger-200 border border-danger-400 rounded">
          <p className="text-danger-900 antialiased font-extralight">
            {errors.root.message}
          </p>
        </div>
      ) : null}

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full text-neutral-50"
        color="primary"
        size="lg"
        radius="sm"
      >
        Entrar
      </Button>
    </form>
  );
}
