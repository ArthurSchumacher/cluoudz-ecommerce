"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link } from "@nextui-org/react";
import { paths } from "@/paths";
import { SingleProduct } from "@/types/product";
import OrderDetails from "./OrderDetails";
import CheckoutProduct from "./CheckoutProduct";
import DeliveryAddress from "./DeliveryAddress";
import AddressSidebar from "./AddressSidebar";
import toast from "react-hot-toast";
import { Address } from "@/types/address";
import PaymentSuccess from "./PaymentSuccess";
import { OrderDto } from "@/types/order";
import { useCart } from "@/hooks/useCart";
import * as actions from "@/actions";

const checkoutSchema = z.object({
  addressId: z.string().optional(),
  paymentIntentId: z.string().optional(),
});

type CheckoutFormFields = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  clientSecret: string;
  products: SingleProduct[];
  addresses: Address[];
}

function CheckoutForm({
  clientSecret,
  products,
  addresses,
}: CheckoutFormProps) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormFields>({
    resolver: zodResolver(checkoutSchema),
  });
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [address, setAddress] = useState<Address>(addresses[0]);
  const { handleSetPaymentIntent } = useCart();

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const onSubmit: SubmitHandler<CheckoutFormFields> = async (data) => {
    try {
      if (!stripe || !elements) {
        return;
      }

      data.addressId = address.id;
      data.paymentIntentId = localStorage.getItem("paymentIntentId") as string;

      const orderDto: OrderDto = {
        addressId: data.addressId,
        payment_intent_id: data.paymentIntentId,
        date_payment: new Date(Date.now()),
      };

      stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
        })
        .then((result) => {
          if (!result.error) {
            toast.success("Pagamento efetuado com sucesso!");
            handleSetPaymentSuccess(true);
            handleSetPaymentIntent(null);
          }
        });

      await actions.placeOrder(orderDto);
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
        <div className="border border-content4 rounded-md bg-content2 p-4 sm:mb-8 mb-4 shadow-md">
          <div className="flex flex-row flex-nowrap gap-x-8">
            <PaymentElement
              className="w-full"
              id="payment-element"
              options={{
                layout: "tabs",
              }}
            />
          </div>
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
        <div className="border border-content4 rounded-md bg-content2 px-2 shadow-md">
          {products.map((product) => {
            return <CheckoutProduct key={product.id} product={product} />;
          })}
        </div>
      </div>
      <div className="sm:col-span-1 col-span-3 flex flex-col sm:gap-4 gap-2">
        <div className="border border-content4 rounded-md bg-content2 p-4 shadow-md">
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
        {clientSecret && !paymentSuccess && (
          <>
            <div className="border border-content4 rounded-md bg-content2 p-4 shadow-md">
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
          </>
        )}

        {paymentSuccess && (
          <>
            <div className="border border-content4 rounded-md bg-content2 p-4 shadow-md">
              <PaymentSuccess />
            </div>

            <Button
              size="lg"
              radius="sm"
              className="w-full text-background"
              color="primary"
              variant="solid"
              as={Link}
              href={paths.orders()}
            >
              Meus pedidos
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export default CheckoutForm;
