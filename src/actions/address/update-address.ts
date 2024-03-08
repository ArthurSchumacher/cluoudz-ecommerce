"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { Address, AddressDto } from "@/types/address";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function updateAddress(
  addressId: string,
  addressDto: AddressDto
): Promise<Address> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const res = await fetch(`${process.env.API_URL}/address/${addressId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(addressDto),
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data;
}
