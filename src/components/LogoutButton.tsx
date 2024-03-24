"use client";

import { useCart } from "@/hooks/useCart";
import { paths } from "@/paths";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as actions from "@/actions";

function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    await actions.revalidateCart();
    toast.success("Logout realizado com sucesso!");
    router.refresh();
  }

  return (
    <Link
      onClick={logout}
      className="text-primary antialiased border-b border-b-transparent hover:border-b-primary"
      href={""}
    >
      Sair.
    </Link>
  );
}

export default LogoutButton;
