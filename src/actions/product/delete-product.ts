"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function deleteProduct(id: string): Promise<string> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const req = await axios
    .delete(`${process.env.API_URL}/product/${id}`, {
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
