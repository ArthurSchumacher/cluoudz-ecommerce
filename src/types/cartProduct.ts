import { Product } from "./product";

export type CartProduct = {
  id: string;
  amount: number;
  product: Product;
};
