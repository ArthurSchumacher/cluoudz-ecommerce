"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { Address, AddressDto } from "@/types/address";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createAddress(addressDto: AddressDto): Promise<Address> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = axios
    .post(`${process.env.API_URL}/address`, addressDto, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      console.log(error.message);
    });

  revalidateTag("address");

  return res;
}
