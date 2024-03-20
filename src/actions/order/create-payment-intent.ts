"use server";

import { nextAuthOptions } from "@/auth";
import { paths } from "@/paths";
import { Cart } from "@/types/cart";
import { CartProduct } from "@/types/cartProduct";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProduct[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.amount * item.product.price;
    return acc + itemTotal;
  }, 20);

  return totalPrice;
};

export type PaymentIntentDto = {
  payment_intent_id: string | null;
};

export async function createPaymentIntent(data: PaymentIntentDto) {
  const session = await getServerSession(nextAuthOptions);
  if (!session || !session.user) {
    redirect(paths.signIn());
  }

  const cart: Cart = await axios
    .get(`${process.env.API_URL}/cart`, {
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

  const items = cart.cartProduct;
  const { payment_intent_id } = data;
  const total = Math.floor(calculateOrderAmount(items) * 100);

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      return {
        id: updated_intent.id,
        client_secret: updated_intent.client_secret,
      };
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "BRL",
      automatic_payment_methods: { enabled: true },
    });

    return { id: paymentIntent.id, client_secret: paymentIntent.client_secret };
  }
}
