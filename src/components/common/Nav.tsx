"use client";
import { paths } from "@/paths";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

interface ProfileNavProps {
  links: { path: string; label: string }[];
}

function Nav({ links }: ProfileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row items-center justify-center sm:gap-8 gap-2 border-b border-b-content1 sm:overflow-hidden overflow-x-scroll">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`${
            pathname.includes(link.path)
              ? `bg-primary text-background`
              : `bg-content2 text-content1`
          } inline-flex items-center justify-center w-full max-w-xs p-4 border-t border-r border-l border-t-content1 border-r-content1 border-l-content1 rounded-t-md`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
