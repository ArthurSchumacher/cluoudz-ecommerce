"use server";

import axios from "axios";

type signUpUserDto = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
};

export async function signUp(signUpUserDto: signUpUserDto) {
  const res = await axios
    .post(`${process.env.API_URL}/auth/signup`, signUpUserDto)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return res;
}
