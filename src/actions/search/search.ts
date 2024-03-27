"use server";

import { paths } from "@/paths";
import { redirect, useSearchParams } from "next/navigation";

export type SearchDto = {
  product: string;
  category?: string | null;
};

export async function search(searchDto: SearchDto) {
  const product = searchDto.product;
  let category = searchDto.category;

  if (typeof product !== "string" || !product) {
    redirect("/");
  }

  if (!category) {
    category = undefined;
  }

  redirect(paths.search(category, product));
}
