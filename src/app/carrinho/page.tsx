import CartClient from "@/components/cart/CartClient";
import Container from "@/components/common/Container";
import React from "react";
import * as queries from "@/queries";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";

async function CartPage() {
  const session = await getServerSession(nextAuthOptions);
  const userCart = await queries.userCart();

  if (!session || userCart.message) {
    return (
      <section>
        <Container>
          <CartClient />
        </Container>
      </section>
    );
  }

  if (!userCart.message && userCart.cartProduct.length > 0) {
    let productsPromises = userCart.cartProduct.map(async (cartProduct) => {
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
          <CartClient products={products} />
        </Container>
      </section>
    );
  }
}

export default CartPage;
