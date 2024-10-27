"use client";

import { useQuery } from "@tanstack/react-query";
import ResponsiveTable from "../responsiveTable";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { IProductNearIdealStockParams } from "@/types/metrics";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductsNearIdealStockTable() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const [page, setPage] = useState(1);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["totalStockCost", isLoaded, userId, page],
    queryFn: async (): Promise<IProductNearIdealStockParams> => {
      const params = handleQueryParams({ userId, page, pageSize: 10 });
      const response = await fetch(
        `/api/metrics/productsNearIdealStock?${params}`
      );

      console.log("response", response);
      return response.json();
    },
  });

  const isSmallScreen = useIsSmallScreen();

  return isLoading ? (
    <Skeleton
      variant="rounded"
      width="100%"
      height={isSmallScreen ? 500 : 300}
    />
  ) : (
    <>
      <ResponsiveTable
        height={isSmallScreen ? 500 : 300}
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
        totalPages={data?.totalPages || 0}
        isMobile={true}
        handlePageChange={handlePageChange}
        page={page}
      />
    </>
  );
}
