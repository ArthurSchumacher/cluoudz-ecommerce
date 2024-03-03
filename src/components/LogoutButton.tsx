"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <Link
      onClick={logout}
      className="text-secondary antialiased border-b border-b-transparent hover:border-b-neutral-50"
      href={""}
    >
      Sair.
    </Link>
  );
}

export default LogoutButton;
