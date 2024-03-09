"use server";

import { nextAuthOptions } from "@/auth";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";

export async function userProfile(): Promise<User> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status} - UEX1001`;
    console.error(errorMessage);
  }

  const data = await res.json();
  return data;
}
