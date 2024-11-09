"use client";

import PaymentMethodPieCharts from "@/components/paymentMethodPierCharts";
import ProductsNearIdealStockTable from "@/components/productsNearIdealStockTable";
import ResponsiveTable from "@/components/responsiveTable";
import HeaderSearchBar from "@/components/tablePage/header/headerSearchBar";
import TopSellingProducts from "@/components/topSellingProducts";
import TotalStockCostDisplay from "@/components/totalStockCostDisplay";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { IStockMetricsResponse } from "@/types/metrics";
import { IListProductsOutput } from "@/types/products";
import { formatDateToLocal } from "@/utils/formatDateToLoca";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { useUser } from "@clerk/nextjs";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MetricsPage() {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formattedSevenDaysAgo = formatDateToLocal(sevenDaysAgo);
  const formattedToday = formatDateToLocal(today);

  const router = useRouter();
  const { user, isLoaded } = useUser();
  const userId = user?.id as string;

  const [startDateSalesMetrics, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDateSalesMetrics, setEndDate] = useState(formattedToday);
  const [appliedSalesMetricsFilters, setSalesMetricsFilters] = useState<
    Record<string, string>
  >({
    startDate: startDateSalesMetrics,
    endDate: endDateSalesMetrics,
  });

  const [startDateStockMetrics, setStartDateStockMetrics] = useState(
    formattedSevenDaysAgo
  );
  const [endDateStockMetrics, setEndDateStockMetrics] =
    useState(formattedToday);
  const [nameStockMetrics, setNameStockMetrics] = useState("");

  const [appliedStockMetricsFilters, setStockMetricsFilters] = useState<
    Record<string, string>
  >({
    startDate: startDateStockMetrics,
    endDate: endDateStockMetrics,
    filterName: "",
  });

  const [page, setPage] = useState(1);

  const isSmallScreen = useIsSmallScreen();

  const { isLoading, data, isFetching } = useQuery({
    queryKey: [
      "stockMetrics",
      page,
      isLoaded,
      appliedStockMetricsFilters.filterName,
      appliedStockMetricsFilters.startDate,
      appliedStockMetricsFilters.endDate,
    ],
    queryFn: async (): Promise<IStockMetricsResponse> => {
      const params = {
        userId: user?.id,
        page: page.toString(),
        pageSize: "10",
        name: appliedStockMetricsFilters.filterName,
        startDate: appliedStockMetricsFilters.startDate,
        endDate: appliedStockMetricsFilters.endDate,
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(
        `/api/metrics/stockMetrics?${paramsParsed}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseParsed = (await response.json()) as IStockMetricsResponse;

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
      const params = { userId: user?.id, search: searchQuery, pageSize: "10" };
      const paramsParsed = handleQueryParams(params);

      const response = await fetch(`/api/products?${paramsParsed}`);
      return response.json() as Promise<IListProductsOutput>;
    },
  });

  return (
    <Grid container padding={3} paddingTop={isSmallScreen ? 10 : 0}>
      <Grid item xs={12} md={12}>
        <Typography color={"#00585e"} variant="h4" marginBottom={5}>
          Métricas de venda
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <HeaderSearchBar
          inputs={[
            {
              label: "Data inicial",
              value: startDateSalesMetrics,
              setValue: setStartDate,
              type: "date",
            },
            {
              label: "Data final",
              value: endDateSalesMetrics,
              setValue: setEndDate,
              type: "date",
              minValue: startDateSalesMetrics,
            },
          ]}
          handleSubmit={() => {
            setSalesMetricsFilters({
              startDate: startDateSalesMetrics,
              endDate: endDateSalesMetrics,
            });
          }}
          isMobile={isSmallScreen}
        />
      </Grid>

      <Grid container item spacing={2} xs={12} md={12}>
        <Grid item xs={12} md={3}>
          <PaymentMethodPieCharts
            startDate={appliedSalesMetricsFilters.startDate}
            endDate={appliedSalesMetricsFilters.endDate}
            userId={userId}
            height={{
              smallScreen: 400,
              largeScreen: 348,
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TopSellingProducts
            startDate={appliedSalesMetricsFilters.startDate}
            endDate={appliedSalesMetricsFilters.endDate}
            isSmallScreen={isSmallScreen}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography
          color={"#00585e"}
          variant="h4"
          marginTop={5}
          marginBottom={5}
        >
          Métricas de estoque
        </Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <HeaderSearchBar
          inputs={[
            {
              label: "Nome do produto",
              value: nameStockMetrics,
              setValue: setNameStockMetrics,
              type: "autocomplete",
              options: autocompleteValue?.products || [],
              getOptionLabel: (option) => option.name || "",
              onInputChange: (event, newInputValue) => {
                setSearchQuery(newInputValue);
                refetch();
              },
              onChange: (event, newValue) => {
                setNameStockMetrics(newValue ? newValue.name : "");
              },
              loading: isLoadingAutoComplete,
            },
            {
              label: "Data inicial",
              value: startDateStockMetrics,
              setValue: setStartDateStockMetrics,
              type: "date",
            },
            {
              label: "Data final",
              value: endDateStockMetrics,
              setValue: setEndDateStockMetrics,
              type: "date",
              minValue: startDateStockMetrics,
            },
          ]}
          handleSubmit={() => {
            setStockMetricsFilters({
              startDate: startDateStockMetrics,
              endDate: endDateStockMetrics,
              filterName: nameStockMetrics,
            });
          }}
          isMobile={isSmallScreen}
        />
      </Grid>

      <Grid container item spacing={2} xs={12} md={12}>
        <Grid item xs={12} md={3}>
          <TotalStockCostDisplay
            height={{
              smallScreen: 400,
              largeScreen: 348,
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductsNearIdealStockTable useResponsiveTable={isSmallScreen} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ResponsiveTable
            data={data?.products || []}
            isLoading={isLoading}
            isFetching={isFetching}
            columns={[
              { name: "Nome", objectKey: "name" },
              { name: "Vendas", objectKey: "totalSales" },
              { name: "Estoque", objectKey: "stockQuantity" },
              { name: "Consumo médio (R$)", objectKey: "averageConsumption" },
              {
                name: "Cobertura de estoque",
                objectKey: "stockCoverage",
                description:
                  "Indica o número de dias ou meses que o estoque atual é capaz de sustentar a demanda prevista, considerando o consumo médio.",
              },
              {
                name: "Taxa de giro",
                objectKey: "turnoverRate",
                description:
                  "Reflete a quantidade de vezes que o estoque foi renovado ou vendido em um período, demonstrando a eficiência na movimentação de estoque.",
              },
              {
                name: "Estoque ideal mínimo",
                objectKey: "minimumIdealStock",
                description:
                  "Representa a quantidade mínima de estoque necessária para evitar falta de produtos e garantir a continuidade das operações.",
              },
            ]}
            columnsShowInResponsive={{
              mainColumn: {
                name: "Nome",
                objectKey: "name",
              },
              secondaryColumn: [
                { name: "Vendas", objectKey: "totalSales" },
                { name: "Estoque", objectKey: "stockQuantity" },
                { name: "Consumo médio (R$)", objectKey: "averageConsumption" },
                {
                  name: "Cobertura de estoque",
                  objectKey: "stockCoverage",
                },
                {
                  name: "Taxa de giro",
                  objectKey: "turnoverRate",
                },
                {
                  name: "Estoque ideal mínimo",
                  objectKey: "minimumIdealStock",
                },
              ],
            }}
            tableTittle="Métricas de Produtos"
            totalPages={data?.totalPages || 1}
            page={page}
            handlePageChange={(event, value) => setPage(value)}
            isMobile={isSmallScreen}
            height={600}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
