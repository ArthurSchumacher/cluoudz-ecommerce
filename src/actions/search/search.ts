"use server";

import { paths } from "@/paths";
import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const product = formData.get("product");

  if (typeof product !== "string" || !product) {
    redirect("/");
  }

  redirect(paths.search(undefined, product));
}
