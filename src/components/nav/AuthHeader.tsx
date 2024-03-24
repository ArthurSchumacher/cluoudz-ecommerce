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
        {session.data.user.typeUser === 1 ? (
          <Link
            href={paths.adminCategories()}
            className="text-content1 border-b border-b-transparent hover:border-b-content1"
          >
            <FiUser size={20} />
          </Link>
        ) : (
          <FiUser size={20} className="text-content1" />
        )}
        <p className="text-content1 antialiased uppercase font-bold">
          Bem vindo{" "}
          <Link
            href={paths.profile()}
            className="text-content1 antialiased uppercase border-b border-b-transparent hover:border-b-content1"
          >
            {session.data.user.name}
          </Link>
          , <LogoutButton />
        </p>
      </>
    );
  }

  if (session.status === "unauthenticated") {
    authContent = (
      <>
        <FiUser size={20} className="text-content1" />
        <p className="text-content1 antialiased uppercase font-bold">
          Bem vindo visitante,{" "}
          <Link
            href={paths.signUp()}
            className="text-content1 antialiased border-b border-b-transparent hover:border-b-content1"
          >
            cadastre-se
          </Link>{" "}
          ou{" "}
          <Link
            href={paths.signIn()}
            className="text-content1 antialiased border-b border-b-transparent hover:border-b-content1"
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
