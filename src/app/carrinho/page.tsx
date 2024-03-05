import Title from "@/components/Title";
import CartClient from "@/components/cart/CartClient";
import Container from "@/components/common/Container";
import React from "react";
import * as queries from "@/queries";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";

async function CartPage() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return (
      <section>
        <Container>
          <CartClient />
        </Container>
      </section>
    );
  }

  const userCart = await queries.userCart();

  if (userCart._count > 0) {
    let productsPromises = userCart.cartProduct.map(async (cartProduct) => {
      const product = await queries.singleProduct(
        cartProduct.product.id.toString()
      );

      return product;
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
