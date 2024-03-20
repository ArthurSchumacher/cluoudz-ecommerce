"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { ProductToCartDto, SingleCart } from "@/types/cart";
import { Order, OrderDto } from "@/types/order";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function addToCart(orderDto: OrderDto): Promise<Order> {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const order: Order = await axios
    .post(
      `${process.env.API_URL}/order`,
      {
        addressId: orderDto.addressId,
        code_pix: orderDto.payment_intent_id,
        date_payment: orderDto.date_payment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      console.log(error.message);
    });

  return order;
}
