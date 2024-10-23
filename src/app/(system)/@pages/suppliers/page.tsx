"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { TListSuppliersResponse } from "../../../../types/suppliers";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import PageContent from "@/components/tablePage/content";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { formatDateToLocal } from "@/utils/formatDateToLoca";

export default function SuppliersPage() {
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
      "suppliers",
      page,
      isLoaded,
      appliedFilters.filterName,
      appliedFilters.startDate,
      appliedFilters.endDate,
    ],
    queryFn: async (): Promise<TListSuppliersResponse> => {
      const params = {
        userId: user?.id,
        page: page.toString(),
        pageSize: "10",
        name: appliedFilters.filterName,
        startDate: appliedFilters.startDate,
        endDate: appliedFilters.endDate,
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(
        `/api/suppliers?${paramsParsed}&pageSize=10`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseParsed = (await response.json()) as TListSuppliersResponse;

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
      isSmallScreen={useIsSmallScreen()}
      headerContent={{
        headerSearchBar: {
          inputs: [
            {
              value: filterName,
              setValue: setFilterName,
              label: "Nome do Fornecedor",
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
        headerTittle: "Fornecedor",
        headerActionButton: {
          onClick: () => {
            router.push("/suppliers/create");
          },
          text: "Adicionar Fornecedor",
          icon: <Add />,
        },
      }}
      tableConfig={{
        isLoading,
        isFetching,
        data:
          data?.suppliers?.map((suppliers) => {
            return {
              ...suppliers,
              createdAt: new Date(suppliers.createdAt)
                .toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
                .replace(",", ""),
              rowAction: () => router.push(`/suppliers/${suppliers.id}`),
            };
          }) || [],
        columns: [
          { name: "Nome", objectKey: "name", hasImage: true },
          { name: "Endereço", objectKey: "address" },
          { name: "Telefone", objectKey: "phone" },
          { name: "Email", objectKey: "email" },
          { name: "CNPJ", objectKey: "cnpj" },
          { name: "Data de criação", objectKey: "createdAt" },
        ],
        columnsShowInResponsive: {
          mainColumn: {
            name: "Nome",
            objectKey: "name",
            hasImage: true,
          },
          secondaryColumn: [
            { name: "Endereço", objectKey: "address" },
            { name: "Telefone", objectKey: "phone" },
          ],
        },
        page,
        totalPages: data?.totalPages || 0,
        handlePageChange,
        isMobile: false,
      }}
    />
  );
}
