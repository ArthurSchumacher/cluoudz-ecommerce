import { Product } from "./product";

export type OrderProduct = {
  id: string;
  amount: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: Product;
};
