"use server";

import { nextAuthOptions } from "@/auth";
import { Address } from "@/types/address";
import { getServerSession } from "next-auth";

export async function userAddresses(): Promise<Address[]> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/address`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    next: {
      tags: ["addresses"],
    },
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
  }

  const data = await res.json();
  return data;
}

export async function singleAddress(addressId: string): Promise<Address> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/address/${addressId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    next: {
      tags: ["address"],
    },
  });

  if (!res.ok) {
    const errorMessage = `An error has occurred: ${res.status}`;
    console.error(errorMessage);
  }

  const data = await res.json();
  return data;
}
