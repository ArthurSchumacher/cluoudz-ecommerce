"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { ProductToFavoriteDto, SingleFavorite } from "@/types/favorite";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function addToFavorite(
  addItemToFavoriteDto: ProductToFavoriteDto
): Promise<SingleFavorite> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = await fetch(`${process.env.API_URL}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(addItemToFavoriteDto),
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
}
