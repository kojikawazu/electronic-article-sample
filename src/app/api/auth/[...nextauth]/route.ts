import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth/next";

// NextAuth.jsインスタンス
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };