import { FavoriteProduct } from "./favoriteProduct";

export type Favorite = {
  id: string;
  favoriteProduct: FavoriteProduct[];
  message?: string;
};

export type SingleFavorite = {
  id: string;
};

export type ProductToFavoriteDto = {
  productId: number;
};
