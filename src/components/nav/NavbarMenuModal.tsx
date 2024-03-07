"use client";

import { paths } from "@/paths";
import { Button, Link } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import CategoriesList from "./CategoriesList";
import { Category } from "@/types/category";

interface NavbarMenuModalProps {
  categories: Category[];
}

function NavbarMenuModal({ categories }: NavbarMenuModalProps) {
  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  const links = [
    { name: "Home", path: paths.home() },
    { name: "Sobre nós", path: paths.about() },
    { name: "Contato", path: paths.contact() },
    { name: "Meu perfil", path: paths.profile() },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current && !node.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
        isIconOnly
        variant="flat"
        className="bg-transparent text-content1 sm:hidden block"
      >
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </Button>
      <div
        className={`fixed top-0 w-full h-dvh z-40 bg-foreground/25 transition-all duration-1000 ease-in ${
          open ? "left-0 opacity-100" : "left-[-100%] opacity-0"
        }`}
      >
        <div ref={node} className={`w-[90%] h-dvh bg-background p-4 z-50`}>
          <h1 className="text-primary text-md antialiased pb-2">Páginas</h1>
          <hr />
          <ul>
            {links.map((link, index) => {
              return (
                <li key={index} className="text-content3 antialiased py-2">
                  <Link href={link.path}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
          <CategoriesList categories={categories} />
        </div>
      </div>
    </>
  );
}

export default NavbarMenuModal;
