"use client";

import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

/**
 * NextAuth.js(プロバイダー)
 * @param param0 
 * @returns 
 */
export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};