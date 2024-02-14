import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans_JP } from "next/font/google";
import { NextAuthProvider } from "./lib/next-auth/provider";
import Header from "./components/Header";
import Loading from "./loading";

import "./globals.css";

const noteSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Electonic Article Sample",
  description: "Electonic Article Sample",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={noteSansJP.className}>
        <NextAuthProvider>
          <Header />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
