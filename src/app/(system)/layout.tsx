"use client";

import "./../globals.css";
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

export default function RootLayout({
  children,
  pages,
}: Readonly<{
  children: React.ReactNode;
  pages: React.ReactNode;
}>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <html lang="en">
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
                flexDirection: isMobile ? "column" : "row",
                height: "100vh",
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
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  padding: theme.spacing(2),
                  backgroundColor: theme.palette.background.paper,
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
