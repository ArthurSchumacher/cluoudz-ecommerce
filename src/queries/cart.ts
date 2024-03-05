"use server";

import { nextAuthOptions } from "@/auth";
import { Cart } from "@/types/cart";
import { Category } from "@/types/category";
import axios from "axios";
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
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
  }

  const data = await res.json();
  return data;
}
