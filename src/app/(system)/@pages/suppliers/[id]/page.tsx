"use client";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ResponsiveTable from "@/components/responsiveTable";
import HeaderSearchBar from "@/components/tablePage/header/headerSearchBar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";
import DetailsPage from "@/components/detailsPage";
import { IGetSupplierResponse } from "@/types/suppliers";
import { IListProductsOutput } from "@/types/products";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { formatCNPJ, formatPhone } from "@/utils/formatInput";

export default function SupplierPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];

  const [supplier, setSupplier] = useState<
    IGetSupplierResponse["supplier"] | null
  >(null);
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);

  const [appliedFilters, setAppliedFilters] = useState<{
    startDate: string;
    endDate: string;
    name: string | undefined;
  }>({
    startDate: formattedSevenDaysAgo,
    endDate,
    name: undefined,
  });

  const {
    isLoading: deleteSupplierIsLoading,
    refetch: deleteSupplierRefetch,
    isError: deleteError,
    isRefetching: isDeleting,
  } = useQuery({
    queryKey: ["deleteSupplier", id],
    queryFn: async () => {
      const response = await fetch(`/api/suppliers/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      return response.json();
    },
    enabled: false,
  });

  const { isLoading: getSupplierIsLoading, data: getSupplierData } = useQuery({
    queryKey: ["supplier", id],
    queryFn: async (): Promise<IGetSupplierResponse> => {
      const response = await fetch(`/api/suppliers/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const responseParsed = (await response.json()) as IGetSupplierResponse;
      return responseParsed;
    },
    refetchOnWindowFocus: true,
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

  useEffect(() => {
    if (getSupplierData) {
      setSupplier(getSupplierData.supplier);
    }
  }, [getSupplierData]);

  const {
    isLoading: listProductsIsLoading,
    data: listProductsData,
    isFetching: listProductsIsFetching,
    refetch: listProductRefetch,
  } = useQuery({
    queryKey: [
      "products",
      page,
      isLoaded,
      appliedFilters.startDate,
      appliedFilters.endDate,
      appliedFilters.name,
    ],
    queryFn: async (): Promise<IListProductsOutput> => {
      const params = {
        userId: user?.id,
        page: page.toString(),
        pageSize: "10",
        startDate: appliedFilters.startDate || undefined,
        endDate: appliedFilters.endDate || undefined,
        suppliersIds: [id],
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(`/api/products?${paramsParsed}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseParsed = (await response.json()) as IListProductsOutput;

      return responseParsed;
    },
  });

  const isMobile = useIsSmallScreen();

  const listItems = [
    {
      name: "CNPJ:",
      value: supplier?.cnpj ? formatCNPJ(supplier?.cnpj) : undefined,
      icon: <PersonIcon />,
    },
    {
      name: "Email:",
      value: supplier?.email || undefined,
      icon: <EmailIcon />,
    },
    {
      name: "Endereço:",
      value: supplier?.address || undefined,
      icon: <LocationOnIcon />,
    },
    {
      name: "Telefone:",
      value: formatPhone(supplier?.phone || ""),
      icon: <PhoneIcon />,
    },
    {
      name: "Criado em:",
      value: supplier?.createdAt
        ? new Date(supplier.createdAt).toLocaleDateString()
        : undefined,
      icon: <AccessTimeIcon />,
    },
    ...(supplier?.updatedAt
      ? [
          {
            name: "Atualizado em:",
            value: new Date(supplier.updatedAt).toLocaleDateString(),
            icon: <AccessTimeIcon />,
          },
        ]
      : []),
  ].filter((item) => item.value !== undefined);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isDeleting || deleteSupplierIsLoading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DetailsPage
        button={{
          text: "Editar",
          icon: <EditIcon />,
          onClick: () => router.push(`/suppliers/${id}/edit`),
        }}
        dashBoardUp={
          <>
            <HeaderSearchBar
              inputs={[
                {
                  value: name,
                  setValue: setName,
                  label: "Nome do Produto",
                  type: "autocomplete",
                  options: autocompleteValue?.products || [],
                  getOptionLabel: (option) => option.name || "",
                  onInputChange: (event, newInputValue) => {
                    setSearchQuery(newInputValue);
                    refetch();
                  },
                  onChange: (event, newValue) => {
                    setName(newValue ? newValue.name : "");
                  },
                  loading: isLoadingAutoComplete,
                },
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
                  minValue: startDate,
                },
              ]}
              handleSubmit={() => {
                setAppliedFilters({
                  startDate,
                  endDate,
                  name,
                });

                listProductRefetch();
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
              Produtos desse fornecedor
            </Typography>
            <ResponsiveTable
              isLoading={listProductsIsLoading}
              isFetching={listProductsIsFetching}
              data={
                listProductsData?.products?.map((product) => {
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
                }) || []
              }
              columns={[
                { name: "Nome", objectKey: "name", hasImage: true },
                { name: "Preço (R$)", objectKey: "unitPrice" },
                { name: "Quantidade", objectKey: "stockQuantity" },
                { name: "Categorias", objectKey: "categories" },
                { name: "Fornecedores", objectKey: "suppliers" },
                { name: "Posição", objectKey: "positionInStock" },
                { name: "Data de criação", objectKey: "createdAt" },
              ]}
              columnsShowInResponsive={{
                mainColumn: {
                  name: "Nome",
                  objectKey: "name",
                  hasImage: true,
                },
                secondaryColumn: [
                  { name: "Preço (R$)", objectKey: "unitPrice" },
                  { name: "Quantidade", objectKey: "stockQuantity" },
                ],
              }}
              totalPages={listProductsData?.totalPages || 0}
              page={listProductsData?.page || 0}
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
          name: supplier?.name,
          details: listItems,
          image: supplier?.image || undefined,
        }}
        isMobile={isMobile}
        isLoading={getSupplierIsLoading}
        deleteButton={{
          text: "Excluir",
          icon: <DeleteIcon />,
          onClick: async () => {
            await deleteSupplierRefetch();
            if (deleteError) {
              alert("Erro ao deletar fornecedor");
            } else if (!deleteSupplierIsLoading) {
              alert("Fornecedor deletado com sucesso");
              router.push("/suppliers");
            }
          },
        }}
      />
    </>
  );
}
