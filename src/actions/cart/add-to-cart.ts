"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { AddItemToCartDto, SingleCart } from "@/types/cart";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(
  addItemToCartDto: AddItemToCartDto
): Promise<SingleCart> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = await fetch(`${process.env.API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(addItemToCartDto),
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  revalidateTag("cart");
  return data;
}
