"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCart() {
  return revalidateTag("cart");
}
