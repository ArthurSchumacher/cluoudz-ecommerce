"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { Product, ProductDto } from "@/types/product";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function updateProduct(
  productId: string,
  productDto: ProductDto
): Promise<Product> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const req = await axios
    .patch(`${process.env.API_URL}/product/${productId}`, productDto, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
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
