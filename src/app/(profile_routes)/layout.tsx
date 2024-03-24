import Breadcrumb from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Nav from "@/components/common/Nav";
import { paths } from "@/paths";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Container>
        <Breadcrumb
          links={[
            { path: paths.profile(), label: "Perfil" },
            { path: paths.addresses(), label: "Endereços" },
            { path: paths.orders(), label: "Pedidos" },
          ]}
        />
        <Nav
          links={[
            { path: paths.profile(), label: "Perfil" },
            { path: paths.addresses(), label: "Endereços" },
            { path: paths.orders(), label: "Pedidos" },
          ]}
        />
        {children}
      </Container>
    </section>
  );
}
