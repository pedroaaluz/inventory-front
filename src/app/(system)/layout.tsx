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
          <body style={{ margin: 0, padding: 0 }}>
            <Box
              sx={{
                display: "flex",
                overflow: "hidden",
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
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: isMobile ? 3 : 0,
                  marginBottom: 10,
                }}
              >
                {pages}
              </Box>
            </Box>
          </body>
        </ClerkProvider>
      </QueryClientProvider>
    </html>
  );
}
