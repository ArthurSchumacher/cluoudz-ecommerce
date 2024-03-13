"use server";

import { nextAuthOptions } from "@/auth";
import { ApiError } from "@/types/error";
import { Favorite } from "@/types/favorite";
import { getServerSession } from "next-auth";

export async function userFavorites(): Promise<Favorite> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/favorite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    next: {
      tags: ["favorites"],
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => {
      console.log(
        `An error has occured: ${error.status}: ${error.message} - FEX1001`
      );
    });

  return res;
}
