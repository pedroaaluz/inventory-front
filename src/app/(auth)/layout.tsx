import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Toaster richColors></Toaster>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
