"use client";

import { useCart } from "@/hooks/useCart";
import { paths } from "@/paths";
import { signOut } from "next-auth/react";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LogoutButton() {
  const router = useRouter();
  const { handleClearCart } = useCart();

  async function logout() {
    await signOut({
      redirect: false,
    });

    handleClearCart();
    router.push(paths.signIn());
    toast.success("Logout realizado com sucesso!");
  }

  return (
    <Link
      onClick={logout}
      className="text-secondary antialiased border-b border-b-transparent hover:border-b-secondary"
      href={""}
    >
      Sair.
    </Link>
  );
}

export default LogoutButton;
