"use client";

import { paths } from "@/paths";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Container from "./Container";

export default function Breadcrumb() {
  const currentPath = usePathname();
  return (
    <Container>
      <div className="flex items-center py-16">
        <Breadcrumbs>
          {currentPath.includes(paths.home()) ? (
            <BreadcrumbItem href={paths.home()}>
              <p className="text-xl antialiased">Home</p>
            </BreadcrumbItem>
          ) : null}
          {currentPath.includes("login") ? (
            <BreadcrumbItem href={paths.signIn()}>
              <p className="text-xl antialiased">Login</p>
            </BreadcrumbItem>
          ) : null}
          {currentPath.includes("cadastro") ? (
            <BreadcrumbItem href={paths.signUp()}>
              <p className="text-xl antialiased">Cadastro</p>
            </BreadcrumbItem>
          ) : null}
        </Breadcrumbs>
      </div>
    </Container>
  );
}
