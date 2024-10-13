"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { IListProductsOutput } from "../../../../types/products";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import PageContent from "@/components/tablePage/content";
import { Add } from "@mui/icons-material";
import PaymentMethodPierCharts from "@/components/paymentMethodPierCharts";
import TotalStockCostDisplay from "@/components/totalStockCostDisplay";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];
  const router = useRouter();

  const [filterName, setFilterName] = useState("");
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  const [appliedFilters, setAppliedFilters] = useState({
    filterName: "",
    startDate: formattedSevenDaysAgo,
    endDate,
  });

  const [page, setPage] = useState(1);

  const { user, isLoaded } = useUser();

  const handleSubmit = () => {
    setAppliedFilters({
      filterName,
      startDate,
      endDate,
    });
  };

  const { isLoading, data, isFetching } = useQuery({
    queryKey: [
      "products",
      page,
      isLoaded,
      appliedFilters.filterName,
      appliedFilters.startDate,
      appliedFilters.endDate,
    ],
    queryFn: async (): Promise<IListProductsOutput> => {
      const params = {
        userId: user?.id,
        page: page.toString(),
        pageSize: "10",
        name: appliedFilters.filterName,
        startDate: appliedFilters.startDate || undefined,
        endDate: appliedFilters.endDate || undefined,
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(
        `/api/products?${paramsParsed}&pageSize=10`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseParsed = (await response.json()) as IListProductsOutput;

      return responseParsed;
    },
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <PageContent
      headerContent={{
        headerSearchBar: {
          filterName,
          setFilterName,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          handleSubmit,
        },
        headerTittle: "Produtos",
        headerActionButton: {
          onClick: () => {
            router.push("/products/create");
          },
          text: "Adicionar Produto",
          icon: <Add />,
        },
      }}
      tableConfig={{
        isLoading,
        isFetching,
        data:
          data?.products?.map((product) => {
            return {
              ...product,
              category: product.categories[0]?.name,
              createdAt: new Date(product.createdAt)
                .toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
                .replace(",", ""),
              rowAction: () => router.push(`/products/${product.id}`),
            };
          }) || [],
        columns: [
          { name: "Nome", objectKey: "name", hasImage: true },
          { name: "Preço (R$)", objectKey: "unitPrice" },
          { name: "Quantidade", objectKey: "stockQuantity" },
          { name: "Categoria", objectKey: "category" },
          { name: "Posição", objectKey: "positionInStock" },
          { name: "Data de criação", objectKey: "createdAt" },
        ],
        columnsShowInResponsive: {
          mainColumn: {
            name: "Nome",
            objectKey: "name",
            hasImage: true,
          },
          secondaryColumn: [
            { name: "Preço (R$)", objectKey: "unitPrice" },
            { name: "Quantidade", objectKey: "stockQuantity" },
          ],
        },
        page,
        totalPages: data?.totalPages || 0,
        loadingMessage: "Carregando produtos...",
        handlePageChange,
        isMobile: false,
      }}
      dashboardUp={
        <PaymentMethodPierCharts
          endDate={appliedFilters.endDate}
          startDate={appliedFilters.startDate}
          userId={user?.id!}
          isMobile={isMobile}
        />
      }
      dashboardDown={<TotalStockCostDisplay userId={user?.id!} />}
    />
  );
}
