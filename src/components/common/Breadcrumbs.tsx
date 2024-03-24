"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Container from "./Container";

interface BreadcrumbProps {
  links: { path: string; label: string }[];
}

export default function Breadcrumb({ links }: BreadcrumbProps) {
  const currentPath = usePathname();

  return (
    <Container>
      <div className="flex items-center sm:py-16 py-8">
        <Breadcrumbs>
          {links.map((link, index) => {
            if (currentPath.includes(link.path)) {
              return (
                <BreadcrumbItem key={index} href={link.path}>
                  <p className="text-xl antialiased">{link.label}</p>
                </BreadcrumbItem>
              );
            }
            return null;
          })}
        </Breadcrumbs>
      </div>
    </Container>
  );
}
