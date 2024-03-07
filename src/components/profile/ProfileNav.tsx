"use client";
import { paths } from "@/paths";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

function ProfileNav() {
  const pathname = usePathname();
  return (
    <nav>
      <div className="flex flex-row items-center justify-center sm:gap-8 gap-2 border-b border-b-content2">
        <Link
          href={paths.profile()}
          className={`${
            pathname === paths.profile()
              ? `bg-primary text-background`
              : `bg-content1 text-content3`
          } inline-flex items-center justify-center w-full max-w-xs p-4 border-t border-r border-l border-t-content2 border-r-content2 border-l-content2 rounded-t-md`}
        >
          Perfil
        </Link>
        <Link
          href={paths.addresses()}
          className={`${
            pathname === paths.addresses()
              ? `bg-primary text-background`
              : `bg-content1 text-content3`
          } inline-flex items-center justify-center w-full max-w-xs p-4 border-t border-r border-l border-t-content2 border-r-content2 border-l-content2 rounded-t-md`}
        >
          Endereços
        </Link>

        <Link
          href={paths.profile()}
          className="inline-flex items-center justify-center text-content3 w-full max-w-xs p-4 border-t border-r border-l border-t-content2 border-r-content2 border-l-content2 rounded-t-md bg-content1"
        >
          Pedidos
        </Link>
      </div>
    </nav>
  );
}

export default ProfileNav;
