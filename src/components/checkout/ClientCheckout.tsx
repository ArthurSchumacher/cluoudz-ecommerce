"use client";
import { Address } from "@/types/address";
import { SingleProduct } from "@/types/product";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import DeliveryAddress from "./DeliveryAddress";
import OrderDetails from "./OrderDetails";
import AddressSidebar from "./AddressSidebar";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as actions from "@/actions";
import { useCart } from "@/hooks/useCart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutClientProps {
  products: SingleProduct[];
  addresses: Address[];
}

const checkoutSchema = z.object({
  addressId: z.string().optional(),
  code_pix: z.string().optional(),
  payment_intent_id: z.string().optional(),
});

type CheckoutFormFields = z.infer<typeof checkoutSchema>;

function ClientCheckout({ products, addresses }: CheckoutClientProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormFields>({
    resolver: zodResolver(checkoutSchema),
  });

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { paymentIntent, handleSetPaymentIntent } = useCart();
  const [address, setAddress] = useState<Address>(addresses[0]);

  useEffect(() => {
    const shopPaymentIntent: string | null =
      localStorage.getItem("paymentIntentId");

    if (!shopPaymentIntent) {
      actions
        .createPaymentIntent({ payment_intent_id: null })
        .then((res) => {
          return res;
        })
        .then((data: any) => {
          if (data) {
            handleSetPaymentIntent(data.id);
            setClientSecret(data.client_secret);
          }
        });
    } else {
      actions
        .createPaymentIntent({
          payment_intent_id: JSON.parse(shopPaymentIntent),
        })
        .then((res) => {
          return res;
        })
        .then((data: any) => {
          if (data) {
            handleSetPaymentIntent(data.id);
            setClientSecret(data.client_secret);
          }
        });
    }
  }, []);

  const onSubmit: SubmitHandler<CheckoutFormFields> = async (data) => {
    try {
    } catch (error) {
      toast.error("Falha ao realizar checkout.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 gap-x-8 gap-y-4 sm:pb-16 pb-8"
    >
      <div className="sm:col-span-2 col-span-3">
        <div className="border border-content4 rounded-md bg-background p-4 sm:mb-8 mb-4 shadow-md">
          <div className="flex flex-row flex-nowrap gap-x-8"></div>
        </div>
        <div className="grid grid-cols-4 mb-2">
          <p className="col-span-2 justify-self-start text-sm font-semibold">
            Produtos
          </p>
          <p className="justify-self-center text-sm font-semibold">
            Quantidade
          </p>
          <p className="justify-self-end text-sm font-semibold">Total</p>
        </div>
        <div className="border border-content4 rounded-md bg-background p-2 shadow-md">
          {products.map((product) => {
            return <CheckoutProduct key={product.id} product={product} />;
          })}
        </div>
      </div>
      <div className="sm:col-span-1 col-span-3 flex flex-col sm:gap-4 gap-2">
        <div className="border border-content4 rounded-md bg-background p-4 shadow-md">
          <DeliveryAddress address={address} />
        </div>
        <div className="sm:p-4 p-1 flex items-center justify-center">
          <AddressSidebar
            addresses={addresses}
            address={address}
            onSelect={(address: Address) => {
              setAddress(address);
            }}
          />
        </div>
        <div className="border border-content4 rounded-md bg-background p-4 shadow-md">
          <OrderDetails products={products} address={address} />
        </div>

        <Button
          size="lg"
          radius="sm"
          className="w-full"
          color="primary"
          variant="solid"
          isLoading={isSubmitting}
          type="submit"
        >
          Pagar agora
        </Button>
      </div>
    </form>
  );
}

export default ClientCheckout;
