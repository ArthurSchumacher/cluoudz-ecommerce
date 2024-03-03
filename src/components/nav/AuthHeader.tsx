"use client";

import { paths } from "@/paths";
import { Link, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { FiUser } from "react-icons/fi";
import LogoutButton from "../LogoutButton";

function AuthHeader() {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = <></>;
  }

  if (session.status === "authenticated") {
    authContent = (
      <>
        <FiUser size={20} className="text-neutral-50" />
        <p className="text-neutral-50 antialiased uppercase font-bold">
          Bem vindo {session.data.user.name}, <LogoutButton />
        </p>
      </>
    );
  }

  if (session.status === "unauthenticated") {
    authContent = (
      <>
        <FiUser size={20} className="text-neutral-50" />
        <p className="text-neutral-50 antialiased uppercase font-bold">
          Bem vindo visitante,{" "}
          <Link
            href={paths.signUp()}
            className="text-neutral-50 antialiased border-b border-b-transparent hover:border-b-neutral-50"
          >
            cadastre-se
          </Link>{" "}
          ou{" "}
          <Link
            href={paths.signIn()}
            className="text-neutral-50 antialiased border-b border-b-transparent hover:border-b-neutral-50"
          >
            faça seu login
          </Link>
        </p>
      </>
    );
  }

  return authContent;
}

export default AuthHeader;
