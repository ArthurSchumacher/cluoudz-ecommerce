import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      typeUser: number;
    };
    access_token: string;
  }
}
