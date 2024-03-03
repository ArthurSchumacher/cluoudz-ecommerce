"use client";

import { paths } from "@/paths";
import { Button } from "@nextui-org/react";
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
        className="bg-transparent text-neutral-50"
      >
        {open ? (
          <FaTimes size={20} className="sm:hidden block" />
        ) : (
          <FaBars size={20} className="sm:hidden block" />
        )}
      </Button>
      <div
        className={`fixed top-0 w-full h-dvh z-10 bg-neutral-950/25 transition-all duration-1000 ease-in ${
          open ? "left-0 opacity-100" : "left-[-100%] opacity-0"
        }`}
      >
        <div ref={node} className={`w-[90%] h-dvh bg-neutral-100 p-4`}>
          <h1 className="text-fuchsia-950 text-md antialiased pb-2">Páginas</h1>
          <hr />
          <ul>
            {links.map((link, index) => {
              return (
                <li key={index} className="text-neutral-700 antialiased py-2">
                  {link.name}
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
