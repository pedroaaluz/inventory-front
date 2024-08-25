import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Sidebar from "@/components/sidebar/sidebar";
import {
  Home as HomeIcon,
  ImportExport as ImportExportIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory",
};

export default function RootLayout({
  children,
  pages,
}: Readonly<{
  children: React.ReactNode;
  pages: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Toaster richColors></Toaster>
        <body className={inter.className}>
          <div className="flex min-h-screen">
            <Sidebar
              data={[
                {
                  text: "Produtos",
                  icon: <HomeIcon />,
                  path: "/products",
                },
                {
                  text: "Fornecedores",
                  icon: <PeopleIcon />,
                  path: "/suppliers",
                },
                {
                  text: "Movimentações",
                  icon: <ImportExportIcon />,
                  path: "/movements",
                },
                {
                  text: "Métricas",
                  icon: <AnalyticsIcon />,
                  path: "/metrics",
                },
              ]}
            />
            <div className="flex-1 p-7">{pages}</div>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
