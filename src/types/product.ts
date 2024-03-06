export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  sale: boolean;
  discount: number;
  image: string;
  category: {
    name: string;
  };
};

export type SingleProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  sale: boolean;
  discount: number;
  description: string;
  image: string;
  category: {
    name: string;
  };
  amount?: number;
};
