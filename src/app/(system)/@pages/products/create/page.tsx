"use client";
import PutPage from "@/components/putPage";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  LocalOffer as LocalOfferIcon,
  Campaign as CampaignIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { ICreateProductResponse } from "@/types/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategoryListResponse } from "@/types/categories";
import { TListSuppliersResponse } from "@/types/suppliers";
import { InputField } from "@/types/putPage";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { useUser } from "@clerk/nextjs";
import DefaultButton from "@/components/defaultButton";
import { toast } from "sonner";
import removeNulls from "@/utils/removeNulls";

export default function ProductPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading: listCategoriesLoading, data: listCategoriesData } =
    useQuery({
      queryKey: ["categories"],
      queryFn: async (): Promise<ICategoryListResponse> => {
        const response = await fetch(`/api/categories`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseParsed = (await response.json()) as ICategoryListResponse;

        return responseParsed;
      },
    });

  const { isLoading: listSuppliersLoading, data: listSuppliersData } = useQuery(
    {
      queryKey: ["suppliers"],
      queryFn: async (): Promise<TListSuppliersResponse> => {
        const params = {
          userId: user?.id,
        };
        console.log({ params });
        const paramsParsed = handleQueryParams(params);

        const response = await fetch(
          `/api/suppliers?${paramsParsed}&pageSize=100000`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseParsed =
          (await response.json()) as TListSuppliersResponse;

        return responseParsed;
      },
      enabled: isLoaded,
    }
  );

  const [productData, setProductData] = useState({
    name: undefined,
    description: undefined,
    avatarImage: undefined,
    stockQuantity: undefined as number | undefined,
    unitPrice: undefined as number | undefined,
    positionInStock: undefined,
    minimumIdealStock: undefined as number | undefined,
    productionCost: undefined as number | undefined,
    categories: [] as { name: string; id: string }[],
    categoriesOptions: [] as { name: string; id: string }[],
    suppliers: [] as { name: string; id: string }[],
    suppliersOptions: [] as { name: string; id: string }[],
  });

  const [activeCreateApi, setActiveCreateApi] = useState(false);

  const {
    isLoading: createProductLoading,
    isError,
    isRefetching,
    data: createProductData,
    refetch,
  } = useQuery({
    queryKey: ["createProduct"],
    queryFn: async (): Promise<ICreateProductResponse> => {
      const entry = {
        userId: user?.id,
        name: productData.name,
        description: productData.description,
        image: productData.avatarImage,
        stockQuantity: productData.stockQuantity,
        unitPrice: productData.unitPrice,
        positionInStock: productData.positionInStock,
        minimumIdealStock: productData.minimumIdealStock,
        productionCost: productData.productionCost,
        categoriesIds: productData.categories.map((category) => category.id),
        suppliersIds: productData.suppliers.map((supplier) => supplier.id),
      };

      const requiredKeys = ["name", "stockQuantity", "unitPrice"] as const;

      for (const key of requiredKeys) {
        if (!entry[key]) {
          toast.warning(
            "Por favor, preencha todos os campos obrigatórios: Nome, Quantidade em Estoque e Preço Unitário"
          );

          throw new Error(
            "Por favor, preencha todos os campos obrigatórios: Nome, Quantidade em Estoque e Preço Unitário"
          );
        }
      }

      const response = await fetch(`/api/products/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(removeNulls(entry)),
      });

      const responseParsed = (await response.json()) as ICreateProductResponse;
      console.log({ responseParsed });
      if (responseParsed.status !== 200) {
        throw new Error("Erro ao criar o produto");
      }

      return responseParsed;
    },
    enabled: activeCreateApi,
  });

  const handleProductChange = (key: string, value: any) => {
    setProductData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const listInputs: InputField[] = [
    {
      label: "Quantidade em Estoque",
      value: productData.stockQuantity || 0,
      onChangeValue: (value: number | undefined) => {
        handleProductChange("stockQuantity", value);
      },
      icon: <InventoryIcon />,
      type: "number-integer",
    },
    {
      label: "Preço Unitário (R$)",
      value: productData.unitPrice || 0.0,
      onChangeValue: (value: number | undefined) => {
        handleProductChange("unitPrice", value);
      },
      icon: <AttachMoneyIcon />,
      type: "number",
    },
    {
      label: "Posição no Estoque",
      value: productData.positionInStock || "",
      onChangeValue: (value: string) => {
        handleProductChange("positionInStock", value);
      },
      icon: <LocationOnIcon />,
      type: "text",
    },
    {
      label: "Estoque Ideal Mínimo",
      value: productData.minimumIdealStock || 0,
      onChangeValue: (value: number | undefined) => {
        handleProductChange("minimumIdealStock", value);
      },
      icon: <CampaignIcon />,
      type: "number-integer",
    },
    {
      label: "Custo de Produção (R$)",
      value: productData.productionCost || 0.0,
      onChangeValue: (value: number | undefined) => {
        handleProductChange("productionCost", value);
      },
      icon: <AttachMoneyIcon />,
      type: "number",
    },
    {
      label: "Categorias",
      value: productData.categories,
      onChangeValue: (value: { name: string; id: string }[]) => {
        handleProductChange("categories", value);
      },
      icon: <LocalOfferIcon />,
      type: "select",
      options: listCategoriesData?.categories || [],
    },
    {
      label: "Fornecedores",
      value: productData.suppliers,
      onChangeValue: (value: { name: string; id: string }[]) => {
        handleProductChange("suppliers", value);
      },
      icon: <PersonIcon />,
      type: "select",
      options: listSuppliersData?.suppliers || [],
    },
  ];

  return (
    <>
      <PutPage
        descriptionCardProps={{
          name: productData.name || "Coloque o nome de seu produto",
          description: productData.description || "Uma descrição criativa",
          avatarImage: productData.avatarImage,
          onNameChange: (newName) => {
            handleProductChange("name", newName);
          },
          onDescriptionChange: (newDescription) => {
            handleProductChange("description", newDescription);
          },
          onAvatarImageChange: (newImage) => {
            handleProductChange("avatarImage", newImage);
          },
        }}
        isMobile={isMobile}
        listInputs={listInputs}
        isLoading={
          listCategoriesLoading || listSuppliersLoading || createProductLoading
        }
        putButton={
          <DefaultButton
            disable={createProductLoading || isRefetching}
            disableText={"Criando produto!"}
            onClick={async () => {
              setActiveCreateApi(true);
              await refetch();

              if (isError) {
                toast.error("Erro ao criar o produto");
              } else if (!createProductLoading) {
                toast.success("Produto criado com sucesso");
                queryClient.invalidateQueries({ queryKey: ["products"] });

                router.push(`/products/${createProductData?.product.id}`);
              }

              setActiveCreateApi(false);
            }}
            isMobile={isMobile}
            text="Salvar"
          />
        }
      />
    </>
  );
}
