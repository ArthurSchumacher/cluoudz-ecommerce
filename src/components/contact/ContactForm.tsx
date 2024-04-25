"use client";

import { EmailDto } from "@/types/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import * as actions from "@/actions";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Este campo deve ser preenchido." }),
  email: z
    .string()
    .email({ message: "E-mail inválido." })
    .min(1, { message: "Este campo deve ser preenchido." }),
  subject: z.string().min(1, { message: "Este campo deve ser preenchido." }),
  message: z.string().min(1, { message: "Este campo deve ser preenchido." }),
});

type ContactFormFields = z.infer<typeof contactSchema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormFields>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
    try {
      const emailDto: EmailDto = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };
      await actions.sendMail(emailDto);
      toast.success("Sucesso ao enviar mensagem.");
    } catch (error) {
      toast.error("Falha ao enviar mensagem.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <Input
        {...register("name")}
        isInvalid={errors.name ? true : undefined}
        className="bg-content2"
        placeholder="Digite seu nome"
        label="Nome"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content3 antialiased`,
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
        className="bg-content2"
        placeholder="Digite seu e-mail"
        label="E-mail"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content3 antialiased`,
        }}
      />

      {errors.email ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.email.message}
        </p>
      ) : null}

      <Input
        {...register("subject")}
        isInvalid={errors.subject ? true : undefined}
        className="bg-content2"
        placeholder="Digite o assunto"
        label="Assunto"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          input: `placeholder:text-content3 antialiased`,
        }}
      />

      {errors.subject ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.subject.message}
        </p>
      ) : null}

      <Textarea
        {...register("message")}
        isInvalid={errors.message ? true : undefined}
        label="Mensagem"
        placeholder="Digite sua mensagem"
        className="bg-content2"
        minRows={3}
        maxRows={12}
        type="text"
        labelPlacement="outside"
        variant="bordered"
        size="lg"
        radius="sm"
        classNames={{
          label: ["bg-background", "text-md"],
          input: `placeholder:text-content3 antialiased`,
        }}
      />

      {errors.message ? (
        <p className="px-2 -mt-4 text-danger text-sm font-light">
          {errors.message.message}
        </p>
      ) : null}

      <div className="sm:ml-auto">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="text-neutral-50 sm:w-64 w-full"
          color="primary"
          size="lg"
          radius="sm"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
