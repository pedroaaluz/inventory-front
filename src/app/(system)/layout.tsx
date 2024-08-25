import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Sidebar from "@/components/sidebar/sidebar";

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
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-7">
              {" "}
              {/* flex-1 faz com que este div ocupe todo o espaço restante */}
              <h1 className="text-2xl font-semibold">{children}</h1>
            </div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
