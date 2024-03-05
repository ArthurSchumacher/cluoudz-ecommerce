"use server";

import { Product, SingleProduct } from "@/types/product";
import axios from "axios";

export async function allProducts(): Promise<Product[]> {
  const res = await axios
    .get(`${process.env.API_URL}/product`, {
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
