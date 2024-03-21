import Breadcrumb from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import SignInForm from "@/components/SignInForm";
import { paths } from "@/paths";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function SignInPage() {
  return (
    <section className="w-full pb-16 text-content1">
      <Container>
        <Breadcrumb />
        <h1 className="sm:text-3xl text-xl font-light text-content3 pb-6">
          Acessar ou criar conta
        </h1>
        <div className="flex flex-col sm:flex-row gap-14">
          <div className="w-full sm:w-1/2">
            <Card className="bg-content2">
              <CardHeader className="sm:text-2xl text-lg font-extralight text-content1">
                Acesse sua conta
              </CardHeader>
              <CardBody>
                <SignInForm />
              </CardBody>
            </Card>
          </div>
          <div className="w-full sm:w-1/2 flex items-start justify-center flex-col">
            <h2 className="sm:text-3xl text-xl font-light text-secondary pb-6">
              Criar uma conta é rápido, fácil e gratuito!
            </h2>
            <p className="sm:text-lg font-extralight text-content3 mb-6">
              Com a sua conta da {`H'Shop`} você tem acesso a ofertas
              exclusivas, descontos, além de acompanhar os seus pedidos e muito
              mais!
            </p>
            <Button
              variant="ghost"
              color="secondary"
              className="w-full text-content3 hover:text-content1"
              as={Link}
              href={paths.signUp()}
              size="lg"
              radius="sm"
            >
              Criar minha conta
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SignInPage;
