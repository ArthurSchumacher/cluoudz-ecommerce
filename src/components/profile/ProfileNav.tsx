"use client";
import { paths } from "@/paths";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

function ProfileNav() {
  const pathname = usePathname();
  return (
    <nav>
      <div className="flex flex-row items-center justify-center sm:gap-8 gap-2 border-b border-b-content1">
        <Link
          href={paths.profile()}
          className={`${
            pathname === paths.profile()
              ? `bg-primary text-background`
              : `bg-content2 text-content1`
          } inline-flex items-center justify-center w-full max-w-xs p-4 border-t border-r border-l border-t-content1 border-r-content1 border-l-content1 rounded-t-md`}
        >
          Perfil
        </Link>
        <Link
          href={paths.addresses()}
          className={`${
            pathname.includes(paths.addresses())
              ? `bg-primary text-background`
              : `bg-content2 text-content1`
          } inline-flex items-center justify-center w-full max-w-xs p-4 border-t border-r border-l border-t-content1 border-r-content1 border-l-content1 rounded-t-md`}
        >
          Endereços
        </Link>

        <Link
          href={paths.orders()}
          className={`${
            pathname.includes(paths.orders())
              ? `bg-primary text-background`
              : `bg-content2 text-content1`
          } inline-flex items-center justify-center w-full max-w-xs p-4 border-t border-r border-l border-t-content1 border-r-content1 border-l-content1 rounded-t-md`}
        >
          Pedidos
        </Link>
      </div>
    </nav>
  );
}

export default ProfileNav;
