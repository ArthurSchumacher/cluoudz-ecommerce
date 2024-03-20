"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { ProductToCartDto } from "@/types/cart";
import { SingleFavorite } from "@/types/favorite";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function removeFromFavorites(productId: string): Promise<string> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = await fetch(
    `${process.env.API_URL}/favorite/product/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
}