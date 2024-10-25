"use client";

import { useQuery } from "@tanstack/react-query";
import ResponsiveTable from "../responsiveTable";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { IProductNearIdealStockParams } from "@/types/metrics";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductsNearIdealStockTable() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userId = user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["totalStockCost", isLoaded, userId],
    queryFn: async (): Promise<IProductNearIdealStockParams> => {
      const params = handleQueryParams({ userId });
      const response = await fetch(
        `/api/metrics/productsNearIdealStock?${params}`
      );

      return response.json();
    },
  });

  const isSmallScreen = useIsSmallScreen();

  return isLoading ? (
    <Skeleton
      variant="rounded"
      width="100%"
      height={isSmallScreen ? 200 : 300}
    />
  ) : (
    <>
      <ResponsiveTable
        height={isSmallScreen ? 200 : 100}
        isLoading={isLoading}
        data={
          data?.productsNearIdealStock?.map((product) => {
            return {
              ...product,
              rowAction: () => {
                router.push(`/products/${product.id}`);
              },
            };
          }) || []
        }
        isFetching={isLoading}
        tableTittle="Produtos próximos ao estoque mínimo ideal:"
        columns={[
          { name: "Produto", objectKey: "name" },
          { name: "Estoque minimo", objectKey: "minimumIdealStock" },
        ]}
        columnsShowInResponsive={{
          mainColumn: {
            name: "Produto",
            objectKey: "name",
            hasImage: true,
          },
          secondaryColumn: [
            { name: "Quantidade atual", objectKey: "stockQuantity" },
            { name: "Estoque mínimo ideal", objectKey: "minimumIdealStock" },
          ],
        }}
        isMobile={true}
      />
    </>
  );
}
