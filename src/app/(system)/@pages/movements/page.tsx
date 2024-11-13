"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { IListMovementOutput } from "../../../../types/movements";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import PageContent from "@/components/tablePage/content";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { formatDateToLocal } from "@/utils/formatDateToLoca";
import {
  translateMovementType,
  translatePaymentMethod,
} from "@/utils/translators";
import {
  Backdrop,
  Button,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import PaymentMethodPieCharts from "@/components/paymentMethodPierCharts";
import TopSellingProducts from "@/components/topSellingProducts";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { IListProductsOutput } from "@/types/products";
import { toast } from "sonner";
import { queryClient } from "@/services/queryClient";

export default function MovementsPage() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formattedSevenDaysAgo = formatDateToLocal(sevenDaysAgo);
  const formattedToday = formatDateToLocal(today);

  const router = useRouter();
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(formattedToday);
  const [filterName, setFilterName] = useState("");
  const [movementTypeFilter, setMovementTypeFilter] = useState("Todos");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("Todos");

  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string | undefined>
  >({
    filterName: undefined,
    startDate: undefined,
    endDate: undefined,
    paymentMethodFilter: "",
    movementTypeFilter: "",
  });

  const [page, setPage] = useState(1);

  const { user, isLoaded } = useUser();

  const handleSubmit = () => {
    setAppliedFilters({
      filterName,
      startDate,
      endDate,
      paymentMethodFilter,
      movementTypeFilter,
    });
  };

  const isSmallScreen = useIsSmallScreen();

  const {
    isLoading,
    data,
    isFetching,
    refetch: refetchMovements,
  } = useQuery({
    queryKey: [
      "movements",
      page,
      isLoaded,
      appliedFilters.filterName,
      appliedFilters.startDate,
      appliedFilters.endDate,
      appliedFilters.movementTypeFilter,
      appliedFilters.paymentMethodFilter,
    ],
    queryFn: async (): Promise<IListMovementOutput> => {
      const params = {
        userId: user?.id,
        page: page.toString(),
        pageSize: "10",
        productName: appliedFilters.filterName,
        startDate: appliedFilters.startDate,
        endDate: appliedFilters.endDate,
        movementType: translateMovementType(
          appliedFilters.movementTypeFilter as string,
          "en"
        ),
        paymentMethod: translatePaymentMethod(
          appliedFilters.paymentMethodFilter as string,
          "en"
        ),
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(
        `/api/movements?${paramsParsed}&pageSize=10`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseParsed = (await response.json()) as IListMovementOutput;

      return responseParsed;
    },
  });

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: autocompleteValue,
    isLoading: isLoadingAutoComplete,
    refetch,
  } = useQuery({
    queryKey: ["productsSearches", searchQuery],
    queryFn: async (): Promise<IListProductsOutput> => {
      const params = { userId: user?.id, name: searchQuery, pageSize: "10" };
      const paramsParsed = handleQueryParams(params);

      const response = await fetch(`/api/products?${paramsParsed}`);
      return response.json() as Promise<IListProductsOutput>;
    },
  });

  const [movementId, setMovementId] = useState("");

  const {
    isLoading: deleteMovementLoading,
    isError: deleteMovementError,
    refetch: refetchDeleteMovement,
    isRefetching: isDeleting,
    isFetching: isDeletingFetching,
  } = useQuery({
    queryKey: ["deleteMovement"],
    queryFn: async () => {
      const response = await fetch(`/api/movements/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movementId }),
      });

      if (response.status !== 200) {
        throw new Error("Erro ao deletar movimentação.");
      }

      return response.json();
    },
    enabled: false,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isDeleting || deleteMovementLoading || isDeletingFetching}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <PageContent
        headerContent={{
          headerSearchBar: {
            inputs: [
              {
                value: filterName,
                setValue: setFilterName,
                label: "Nome do produto",
                type: "autocomplete",
                options: autocompleteValue?.products || [],
                getOptionLabel: (option: any) => option.name,
                onInputChange: (event, newInputValue) => {
                  setSearchQuery(newInputValue);
                  refetch();
                },
                onChange: (_event: any, newValue: any) => {
                  setFilterName(newValue.name);
                },
                loading: isLoadingAutoComplete,
              },

              {
                value: movementTypeFilter,
                options: [
                  "Venda",
                  "Adição ao Estoque",
                  "Remoção do Estoque",
                  "Todos",
                ],
                setValue: (event: SelectChangeEvent) => {
                  setMovementTypeFilter(event.target.value as string);
                },
                label: "Tipo de Movimentação",
                type: "select",
              },
              {
                text: "Data",
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                label: "Data",
                minValue: formattedSevenDaysAgo,
                type: "dateRange",
                isMobile: isSmallScreen,
              },
            ],
            handleSubmit,
          },
          headerTittle: "Movimentações",
          headerActionButton: {
            onClick: () => {
              router.push("/movements/create");
            },
            text: "Criar movimentação",
            icon: <Add />,
          },
        }}
        tableConfig={{
          isLoading,
          isFetching,
          data:
            data?.movements?.map((movement) => {
              return {
                ...movement,
                movementType: translateMovementType(
                  movement.movementType,
                  "pt-br"
                ),
                paymentMethod: translatePaymentMethod(
                  movement.paymentMethod,
                  "pt-br"
                ),
                movementValue:
                  movement.movementValue &&
                  `${Number(movement.movementValue).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`,
                createdAt: new Date(movement.createdAt)
                  .toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                  .replace(",", ""),
              };
            }) || [],
          buttonDelete: async (id: string) => {
            setMovementId(id);
            console.log(id);
            await refetchDeleteMovement();

            if (deleteMovementError) {
              toast.error("Erro ao deletar movimentação.");
            }

            await refetchMovements();
          },
          columns: [
            { name: "Produto", objectKey: "productName" },
            { name: "Tipo de movimentação", objectKey: "movementType" },
            { name: "Quantidade", objectKey: "quantity" },
            { name: "Valor da movimentação (R$)", objectKey: "movementValue" },
            { name: "Método de pagamento", objectKey: "paymentMethod" },
            { name: "Data da movimentação", objectKey: "createdAt" },
          ],
          columnsShowInResponsive: {
            mainColumn: {
              name: "Produto",
              objectKey: "productName",
            },
            secondaryColumn: [
              {
                name: "Valor da movimentação (R$)",
                objectKey: "movementValue",
              },
              { name: "Tipo de Movimentação", objectKey: "movementType" },
              { name: "Quantidade", objectKey: "quantity" },
              { name: "Data", objectKey: "createdAt" },
            ],
          },
          page,
          totalPages: data?.totalPages || 0,
          handlePageChange,
          isMobile: false,
          height: 650,
        }}
        dashboardUp={
          <PaymentMethodPieCharts
            startDate={startDate}
            endDate={endDate}
            userId={user?.id as string}
          />
        }
        dashboardDown={
          <TopSellingProducts
            startDate={startDate}
            endDate={endDate}
            isSmallScreen={isSmallScreen}
            useResponsiveTable={true}
          />
        }
      />
    </>
  );
}
