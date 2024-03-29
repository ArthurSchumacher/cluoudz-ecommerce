import Breadcrumb from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import SignUpForm from "@/components/SignUpForm";
import { paths } from "@/paths";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import React from "react";

function SignUpPage() {
  return (
    <section className="w-full text-content1 pb-16">
      <Container>
        <Breadcrumb
          links={[
            { path: paths.home(), label: "Home" },
            { path: paths.signUp(), label: "Cadastro" },
          ]}
        />
        <div className="flex flex-col sm:flex-row gap-14">
          <div className="w-full sm:w-1/2">
            <Card className="bg-content2">
              <CardHeader className="text-2xl font-extralight text-primary">
                Crie sua conta
              </CardHeader>
              <CardBody>
                <SignUpForm />
              </CardBody>
            </Card>
          </div>
          <div className="w-full sm:w-1/2 flex items-start justify-center flex-col">
            <h2 className="text-xl font-light text-secondary pb-6">
              Criar uma conta é rápido, fácil e gratuito!
            </h2>
            <p className="text-md font-extralight text-content3">
              Com a sua conta da {`H'Shop`} você tem acesso a ofertas
              exclusivas, descontos, além de acompanhar os seus pedidos e muito
              mais!
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SignUpPage;
