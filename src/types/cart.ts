import { CartProduct } from "./cartProduct";

export type Cart = {
  id: string;
  cartProduct: CartProduct[];
  _count: number;
  _totalPrice: number;
  message?: string;
};

export type ProductToCartDto = {
  productId: number;
  amount: number;
  price?: number;
};

export type SingleCart = {
  id: string;
};
