"use client";
import {
  Typography,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
} from "@mui/material";
import {
  LocalOffer as LocalOfferIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  Campaign as CampaignIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { IGetProductOutput } from "../../../../../types/products";
import type { IListMovementOutput } from "../../../../../types/movements";
import ResponsiveTable from "@/components/responsiveTable";
import HeaderSearchBar from "@/components/tablePage/header/headerSearchBar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import DetailsPage from "@/components/detailsPage";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];

  const [product, setProduct] = useState<IGetProductOutput["product"] | null>(
    null
  );
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [movementTypeFilter, setMovementTypeFilter] = useState("Todos");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("Todos");
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  const [page, setPage] = useState(1);

  const [appliedFilters, setAppliedFilters] = useState({
    startDate: formattedSevenDaysAgo,
    endDate,
    movementTypeFilter: "",
    paymentMethodFilter: "",
  });

  const translatePaymentMethod = (
    paymentMethod: string | null,
    language: "en" | "pt-br"
  ) => {
    if (language === "pt-br") {
      switch (paymentMethod) {
        case "PIX":
          return "PIX";
        case "DEBIT":
          return "Débito";
        case "CREDIT":
          return "Crédito";
        case "CASH":
          return "Dinheiro";
        default:
          return "Sem método de pagamento";
      }
    } else {
      switch (paymentMethod) {
        case "PIX":
          return "PIX";
        case "Débito":
          return "Debit";
        case "Crédito":
          return "Credit";
        case "Dinheiro":
          return "Cash";
        default:
          return undefined;
      }
    }
  };

  const translateMovementType = (
    movementType: string,
    language: "en" | "pt-br"
  ) => {
    if (language === "pt-br") {
      switch (movementType) {
        case "SALE":
          return "Venda";
        case "ADD_TO_STOCK":
          return "Adição ao Estoque";
        case "REMOVE_FROM_STOCK":
          return "Remoção do Estoque";
        default:
          return undefined;
      }
    } else {
      switch (movementType) {
        case "Venda":
          return "SALE";
        case "Adição ao Estoque":
          return "ADD_TO_STOCK";
        case "Remoção do Estoque":
          return "REMOVE_FROM_STOCK";
        default:
          return undefined;
      }
    }
  };

  const { isLoading: getProductIsLoading, data: getProductData } = useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<IGetProductOutput> => {
      const response = await fetch(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const responseParsed = (await response.json()) as IGetProductOutput;
      return responseParsed;
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (getProductData) {
      console.log("Product data received:", getProductData.product);

      setProduct(getProductData.product);
    }
  }, [getProductData]);

  const {
    isLoading: listMovementsIsLoading,
    data: listMovementsData,
    isFetching: listMovementsIsFetching,
    refetch: listMovementsRefetch,
  } = useQuery({
    queryKey: [
      "movement",
      page,
      isLoaded,
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
        startDate: appliedFilters.startDate || undefined,
        endDate: appliedFilters.endDate || undefined,
        productsIds: [id],
        movementType: translateMovementType(
          appliedFilters.movementTypeFilter,
          "pt-br"
        ),
        paymentMethod: translatePaymentMethod(
          appliedFilters.paymentMethodFilter,
          "en"
        ),
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(`/api/movements?${paramsParsed}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseParsed = (await response.json()) as IListMovementOutput;

      return responseParsed;
    },
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const listItems = [
    {
      name: "Categoria:",
      value: product?.categories?.map((category) => category.name).join(", "),
      icon: <LocalOfferIcon sx={{ color: "#fff" }} />,
    },
    {
      name: "Fornecedor:",
      value: product?.suppliers?.map((supplier) => supplier.name).join(", "),
      icon: <PersonIcon />,
    },
    {
      name: "Quantidade em Estoque:",
      value: product?.stockQuantity,
      icon: <InventoryIcon />,
    },
    {
      name: "Preço Unitário:",
      value: `$${product?.unitPrice}`,
      icon: <AttachMoneyIcon />,
    },
    {
      name: "Custo de Compra:",
      value: `$${product?.productionCost}`,
      icon: <AttachMoneyIcon />,
    },
    ...(product?.positionInStock
      ? [
          {
            name: "Posição no Estoque:",
            value: product.positionInStock,
            icon: <LocationOnIcon />,
          },
        ]
      : []),
    ...(product?.minimumIdealStock
      ? [
          {
            name: "Estoque Minimo Ideal:",
            value: product.minimumIdealStock,
            icon: <CampaignIcon />,
          },
        ]
      : []),
    {
      name: "Criado em:",
      value: new Date(product?.createdAt!).toLocaleDateString(),
      icon: <AccessTimeIcon />,
    },
    ...(product?.updatedAt
      ? [
          {
            name: "Atualizado em:",
            value: new Date(product.updatedAt).toLocaleDateString(),
            icon: <AccessTimeIcon />,
          },
        ]
      : []),
  ];

  return (
    <DetailsPage
      button={{
        text: "Editar",
        icon: <EditIcon />,
        onClick: () => router.push(`/products/${id}/edit`),
      }}
      dashBoardUp={
        <>
          <HeaderSearchBar
            inputs={[
              {
                value: startDate,
                setValue: setStartDate,
                label: "Data Inicial",
                type: "date",
              },
              {
                value: endDate,
                setValue: setEndDate,
                label: "Data Final",
                type: "date",
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
                value: paymentMethodFilter,
                options: ["PIX", "Débito", "Crédito", "Dinheiro", "Todos"],
                setValue: (event: SelectChangeEvent) => {
                  setPaymentMethodFilter(event.target.value as string);
                },
                label: "Método de Pagamento",
                type: "select",
              },
            ]}
            handleSubmit={() => {
              setAppliedFilters({
                startDate,
                endDate,
                movementTypeFilter: movementTypeFilter,
                paymentMethodFilter: paymentMethodFilter,
              });

              listMovementsRefetch();
            }}
            isMobile={isMobile}
          />
          <Typography
            marginBottom={2}
            color={"#00585e"}
            variant="h5"
            sx={{ mt: 2 }}
            textAlign={"center"}
          >
            Movimentações com o produto
          </Typography>
          <ResponsiveTable
            isLoading={listMovementsIsLoading}
            isFetching={listMovementsIsFetching}
            data={(listMovementsData?.movements || []).map((movement) => {
              return {
                movementType: translateMovementType(
                  movement.movementType,
                  "pt-br"
                ),
                quantity: movement.quantity,
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
                movementValue: movement.movementValue
                  ? `R$ ${movement.movementValue}`
                  : "R$ 0",
                paymentMethod: translatePaymentMethod(
                  movement.paymentMethod,
                  "pt-br"
                ),
              };
            })}
            columns={[
              { name: "Tipo de Movimentação", objectKey: "movementType" },
              { name: "Quantidade", objectKey: "quantity" },
              { name: "Data de criação", objectKey: "createdAt" },
              { name: "Valor", objectKey: "movementValue" },
              { name: "Método de Pagamento", objectKey: "paymentMethod" },
            ]}
            columnsShowInResponsive={{
              mainColumn: {
                name: "Tipo de Movimentação",
                objectKey: "movementType",
              },
              secondaryColumn: [
                { name: "Quantidade", objectKey: "quantity" },
                { name: "Data", objectKey: "createdAt" },
              ],
            }}
            totalPages={listMovementsData?.totalPages || 0}
            page={listMovementsData?.page || 0}
            handlePageChange={(
              _event: React.ChangeEvent<unknown>,
              value: number
            ) => setPage(value)}
            isMobile={isMobile}
            height={400}
          />
        </>
      }
      entity={{
        name: product?.name,
        description: product?.description,
        image: product?.image,
        details: listItems,
      }}
      isMobile={isMobile}
      isLoading={getProductIsLoading}
    />
  );
}
