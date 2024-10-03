import "@/src/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProviders from "../provider/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord-like Messenger",
  description: "Une application de messagerie instantanée",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
