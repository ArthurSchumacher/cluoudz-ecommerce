"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function NavbarMenuModal() {
  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Adiciona um event listener para fechar o menu ao clicar fora da div
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
        <div ref={node} className={`w-[90%] h-dvh bg-neutral-100`}></div>
      </div>
    </>
  );
}

export default NavbarMenuModal;
