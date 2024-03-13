import React from "react";
import * as queries from "@/queries";
import Container from "@/components/common/Container";
import Empty from "@/components/profile/EmptyOrders";
import ClientFavorites from "@/components/favorites/ClientFavorites";

async function FavoritesPage() {
  const favorites = await queries.userFavorites();

  if (favorites.message || favorites.favoriteProduct.length == 0) {
    return (
      <section>
        <Container>
          <Empty message="Você não possui itens favoritos." />
        </Container>
      </section>
    );
  }

  if (!favorites.message) {
    let productsPromises = favorites.favoriteProduct.map(
      async (cartProduct) => {
        const product = await queries.singleProduct(
          cartProduct.product.id.toString()
        );

        return product;
      }
    );
    const products = await Promise.all(productsPromises);

    return (
      <section>
        <Container>
          <ClientFavorites favorite={favorites} products={products} />
        </Container>
      </section>
    );
  }
}

export default FavoritesPage;
