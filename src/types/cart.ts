import { CartProduct } from "./cartProduct";

export type Cart = {
  id: string;
  cartProduct: CartProduct[];
  _count: number;
};

export type AddItemToCartDto = {
  productId: number;
  amount: number;
};

export type SingleCart = {
  id: string;
};
