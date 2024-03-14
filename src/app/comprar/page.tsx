import Title from "@/components/Title";
import ClientCheckout from "@/components/checkout/ClientCheckout";
import React from "react";
import * as queries from "@/queries";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import Container from "@/components/common/Container";

async function PlaceOrderPage() {
  const cart = await queries.userCart().catch(() => {
    return redirect(paths.cart());
  });
  const addresses = await queries.userAddresses();

  let productsPromises = cart.cartProduct.map(async (cartProduct) => {
    const product = await queries.singleProduct(
      cartProduct.product.id.toString()
    );
    const amount = cartProduct.amount;
    const price = cartProduct.product.price;

    return {
      ...product,
      amount,
      price,
    };
  });
  const products = await Promise.all(productsPromises);

  return (
    <section>
      <Container>
        <Title isUpperCase={false} label="Comprar" />
        <ClientCheckout products={products} addresses={addresses} />
      </Container>
    </section>
  );
}

export default PlaceOrderPage;
