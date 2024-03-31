"use client";
import { Address } from "@/types/address";
import { SingleProduct } from "@/types/product";
import React, { useEffect, useState } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { z } from "zod";
import * as actions from "@/actions";
import { useCart } from "@/hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import { Spinner } from "@nextui-org/react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutClientProps {
  products: SingleProduct[];
  addresses: Address[];
}

function ClientCheckout({ products, addresses }: CheckoutClientProps) {
  const [clientSecret, setClientSecret] = useState("");
  const { handleSetPaymentIntent } = useCart();

  useEffect(() => {
    const shopPaymentIntent: string | null =
      localStorage.getItem("paymentIntentId");

    const createAndUpdatePaymentIntent = (payment_intent_id: string | null) => {
      actions
        .createPaymentIntent({ payment_intent_id })
        .then((res) => res)
        .then((data: any) => {
          if (data) {
            handleSetPaymentIntent(data.id);
            setClientSecret(data.client_secret);
          }
        });
    };

    !shopPaymentIntent
      ? createAndUpdatePaymentIntent(null)
      : createAndUpdatePaymentIntent(JSON.parse(shopPaymentIntent));
  }, [handleSetPaymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            products={products}
            addresses={addresses}
          />
        </Elements>
      )}
      {!clientSecret && (
        <div className="w-full flex items-center justify-center py-16">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default ClientCheckout;
