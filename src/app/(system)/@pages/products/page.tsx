"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { IListProductsOutput } from "../../../../types/products";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import PageContent from "@/components/tablePage/content";
import { Add } from "@mui/icons-material";
import TotalStockCostDisplay from "@/components/totalStockCostDisplay";
import { useRouter } from "next/navigation";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { formatDateToLocal } from "@/utils/formatDateToLoca";
import ProductsNearIdealStockTable from "@/components/productsNearIdealStockTable";

export default function ProductsPage() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formattedSevenDaysAgo = formatDateToLocal(sevenDaysAgo);
  const formattedToday = formatDateToLocal(today);

  const router = useRouter();
  const [filterName, setFilterName] = useState("");
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(formattedToday);

  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string | undefined>
  >({
    filterName: undefined,
    startDate: undefined,
    endDate: undefined,
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
          inputs: [
            {
              value: filterName,
              setValue: setFilterName,
              label: "Nome do produto",
              type: "text",
            },
            {
              value: startDate,
              setValue: setStartDate,
              label: "Data de início",
              type: "date",
            },
            {
              value: endDate,
              setValue: setEndDate,
              label: "Data de fim",
              type: "date",
            },
          ],
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
              categories: product.categories
                .map((category) => category.name)
                .join(", "),
              suppliers: product.suppliers
                .map((supplier) => supplier.name)
                .join(", "),
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
          { name: "Categorias", objectKey: "categories" },
          { name: "Fornecedores", objectKey: "suppliers" },
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
        handlePageChange,
        isMobile: useIsSmallScreen(),
      }}
      dashboardUp={<TotalStockCostDisplay />}
      dashboardDown={<ProductsNearIdealStockTable />}
    />
  );
}
