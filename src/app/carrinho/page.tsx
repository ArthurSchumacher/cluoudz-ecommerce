import Title from "@/components/Title";
import Container from "@/components/common/Container";
import React from "react";

function CartPage() {
  return (
    <div>
      <Container>
        <Title label="Meu Carrinho" isUpperCase={false} />
      </Container>
    </div>
  );
}

export default CartPage;
