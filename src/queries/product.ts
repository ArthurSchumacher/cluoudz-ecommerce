"use server";

import { Product, SingleProduct } from "@/types/product";
import axios from "axios";

export async function allProducts(
  category: string = "",
  product: string = "",
  skip: string = "",
  page: string = ""
): Promise<Product[]> {
  try {
    const res = await axios.get(`${process.env.API_URL}/product`, {
      params: {
        search: product,
        category: category,
        size: skip,
        page: page,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function singleProduct(id: string): Promise<SingleProduct> {
  const res = await axios
    .get(`${process.env.API_URL}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return res;
}
