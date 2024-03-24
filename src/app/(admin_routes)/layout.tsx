import { nextAuthOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import * as queries from "@/queries";
import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumbs";
import Nav from "@/components/common/Nav";
import { paths } from "@/paths";

interface AdminRoutesLayoutProps {
  children: ReactNode;
}

export default async function AdminRoutesLayout({
  children,
}: AdminRoutesLayoutProps) {
  const session = await getServerSession(nextAuthOptions);
  const user = await queries.userProfile();

  if (!session || !user || user.typeUser !== 1) {
    redirect("/");
  }

  return (
    <section>
      <Container>
        <Breadcrumb
          links={[
            { path: paths.home(), label: "Home" },
            { path: paths.adminCategories(), label: "Categorias" },
            { path: paths.adminProducts(), label: "Produtos" },
            { path: paths.adminOrders(), label: "Vendas" },
            { path: paths.adminUsers(), label: "Clientes" },
          ]}
        />
        <Nav
          links={[
            { path: paths.adminCategories(), label: "Categorias" },
            { path: paths.adminProducts(), label: "Produtos" },
            { path: paths.adminOrders(), label: "Vendas" },
            { path: paths.adminUsers(), label: "Clientes" },
          ]}
        />
        {children}
      </Container>
    </section>
  );
}
