"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { Product } from "@/types/product";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData): Promise<Product> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const req = await axios
    .post(`${process.env.API_URL}/product`, formData, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return req;
}
