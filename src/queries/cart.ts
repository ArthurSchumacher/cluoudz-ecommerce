"use server";

import { nextAuthOptions } from "@/auth";
import { Cart } from "@/types/cart";
import { getServerSession } from "next-auth";

export async function userCart(): Promise<Cart> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    next: {
      tags: ["cart"],
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => {
      console.log(
        `An error has occured: ${error.status}: ${error.message} - CEX1001`
      );
    });

  return res;
}
