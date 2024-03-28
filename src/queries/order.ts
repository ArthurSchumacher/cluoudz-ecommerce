"use server";

import { nextAuthOptions } from "@/auth";
import { Order } from "@/types/order";
import { getServerSession } from "next-auth";

export async function userOrders(): Promise<Order[] | any> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    next: {
      tags: ["orders"],
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => {
      console.log(
        `An error has occured: ${error.status}: ${error.message} - OEX1001`
      );
    });

  return res;
}

export async function adminOrders(): Promise<Order[]> {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    throw new Error("You must be logged in!");
  }

  const res = await fetch(`${process.env.API_URL}/order/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    next: {
      tags: ["adminOrders"],
    },
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => {
      console.log(
        `An error has occured: ${error.status}: ${error.message} - OEX1001`
      );
    });

  return res;
}
