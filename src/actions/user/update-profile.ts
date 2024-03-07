"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { UserDto } from "@/types/user";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function updateProfile(userDto: UserDto, userId: string) {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = await axios
    .patch(`${process.env.API_URL}/user/${userId}`, userDto, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
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
