"use server";

import { Category } from "@/types/category";
import axios from "axios";

export async function allCategories(): Promise<Category[]> {
  const res = await axios
    .get(`${process.env.API_URL}/category`, {
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
