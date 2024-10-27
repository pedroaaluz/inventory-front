"use client";

import { useQuery } from "@tanstack/react-query";
import ResponsiveTable from "../responsiveTable";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { ITopSellingResponse } from "@/types/metrics";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopSellingProducts({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
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
    queryKey: ["totalStockCost", isLoaded, userId, page, startDate, endDate],
    queryFn: async (): Promise<ITopSellingResponse> => {
      const params = handleQueryParams({
        userId,
        page,
        pageSize: 10,
        startDate,
        endDate,
      });

      const response = await fetch(`/api/metrics/topSellingProducts?${params}`);

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
          data?.products?.map((product) => {
            return {
              ...product,
              salesValue: product?.salesValue?.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
              image: product.productImage,
              rowAction: () => {
                router.push(`/products/${product.productId}`);
              },
            };
          }) || []
        }
        isFetching={isLoading}
        tableTittle={`Produtos mais vendidos: ${startDate} a ${endDate}`}
        columns={[
          { name: "Produto", objectKey: "productName" },
          {
            name: "Quantidade de vendas",
            objectKey: "salesCount",
          },
          {
            name: "Valor em vendas:",
            objectKey: "salesValue",
          },
        ]}
        columnsShowInResponsive={{
          mainColumn: {
            name: "Produto",
            objectKey: "name",
            hasImage: true,
          },
          secondaryColumn: [
            {
              name: "Quantidade de vendas",
              objectKey: "salesCount",
            },
            {
              name: "Valor em vendas:",
              objectKey: "salesValue",
            },
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
