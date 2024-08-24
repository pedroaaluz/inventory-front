import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
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
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
