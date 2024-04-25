"use server";

import { EmailDto } from "@/types/email";
import axios from "axios";

export async function sendMail(email: EmailDto) {
  const res = await axios
    .post(`${process.env.API_URL}/email`, JSON.stringify(email), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return res;
}
