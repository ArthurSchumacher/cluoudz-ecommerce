"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { Status } from "@/types/status";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function allStatus(): Promise<Status[]> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = await axios
    .get(`${process.env.API_URL}/status`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return res;
}
