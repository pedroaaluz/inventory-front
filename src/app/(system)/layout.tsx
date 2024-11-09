"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Sidebar from "@/components/sidebar/sidebar";
import {
  ImportExport as ImportExportIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { ptBR } from "@clerk/localizations";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export default function RootLayout({
  children,
  pages,
}: Readonly<{
  children: React.ReactNode;
  pages: React.ReactNode;
}>) {
  const isMobile = useIsSmallScreen();

  return (
    <html lang="pt-br">
      <QueryClientProvider client={queryClient}>
        <ClerkProvider localization={ptBR}>
          <Toaster
            expand={true}
            richColors
            closeButton
            position={isMobile ? "top-center" : "bottom-right"}
          />
          <body>
            <Box
              sx={{
                display: "flex",
                maxWidth: isMobile ? "100%" : "99%",
              }}
            >
              <Sidebar
                data={[
                  {
                    text: "Produtos",
                    icon: <InventoryIcon />,
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

              {pages}
            </Box>
          </body>
        </ClerkProvider>
      </QueryClientProvider>
    </html>
  );
}
