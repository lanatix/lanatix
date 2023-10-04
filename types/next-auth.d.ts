import { Brand } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: { walletAddress: String };
  }
  interface User {
    walletAddress: String;
  }
}
