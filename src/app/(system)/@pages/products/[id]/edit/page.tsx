"use client";
import PutPage from "@/components/putPage";
import { useMediaQuery, useTheme } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  LocalOffer as LocalOfferIcon,
  Campaign as CampaignIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { IGetProductOutput, IUpdateProductResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { ICategoryListResponse } from "@/types/categories";
import { TListSuppliersResponse } from "@/types/suppliers";
import { InputField } from "@/types/putPage";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { useUser } from "@clerk/nextjs";
import DefaultButton from "@/components/defaultButton";
import { toast } from "sonner";
import removeNulls from "@/utils/removeNulls";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const { isLoading: getProductIsLoading, data: getProductData } = useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<IGetProductOutput> => {
      const response = await fetch(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseParsed = (await response.json()) as IGetProductOutput;

      return responseParsed;
    },
  });

  const { isLoading: listCategoriesLoading, data: listCategoriesData } =
    useQuery({
      queryKey: ["categories", id],
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
      queryKey: ["suppliers", id],
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

  const {
    isLoading: updateProductLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["updateProduct"],
    queryFn: async (): Promise<IUpdateProductResponse> => {
      const response = await fetch(`/api/products/update`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          removeNulls({
            id,
            userId: user?.id,
            name,
            description,
            image: avatarImage,
            stockQuantity,
            unitPrice,
            positionInStock,
            minimumIdealStock,
            productionCost,
            categoriesIds: categories.map((category) => category.id),
            supplierIds: suppliers.map((supplier) => supplier.id),
          })
        ),
      });
      const responseParsed = (await response.json()) as IUpdateProductResponse;

      if (responseParsed.status !== 200) {
        throw new Error("Erro ao atualizar o produto");
      }

      return responseParsed;
    },
  });

  const defaultValue = [
    {
      name: "",
      id: "",
    },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [stockQuantity, setStockQuantity] = useState<number>();
  const [unitPrice, setUnitPrice] = useState<number>();
  const [positionInStock, setPositionInStock] = useState("");
  const [minimumIdealStock, setMinimumIdealStock] = useState<number>();
  const [productionCost, setProductionCost] = useState<number>();
  const [categories, setCategories] = useState<
    {
      name: string;
      id: string;
    }[]
  >(defaultValue);

  const [categoriesOptions, setCategoriesOptions] = useState<
    {
      id: string;
      name: string;
    }[]
  >(defaultValue);

  const [suppliers, setSuppliers] = useState<{ name: string; id: string }[]>(
    []
  );
  const [suppliersOptions, setSuppliersOptions] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    if (getProductData) {
      setCategories(
        getProductData.product.categories.map((category) => {
          return {
            name: category.name,
            id: category.id,
          };
        })
      );
      setSuppliers(
        getProductData.product.suppliers.map((supplier) => {
          return {
            name: supplier.name,
            id: supplier.id,
          };
        })
      );
    }

    if (listCategoriesData) {
      setCategoriesOptions(
        listCategoriesData.categories?.map((category) => {
          return {
            name: category.name,
            id: category.id,
          };
        })
      );
    }

    if (listSuppliersData) {
      setSuppliersOptions(
        listSuppliersData.suppliers?.map((supplier) => {
          return {
            name: supplier.name,
            id: supplier.id,
          };
        })
      );
    }
  }, [getProductData, listCategoriesData, listSuppliersData]);

  const listInputs: InputField[] = [
    {
      label: "Quantidade em Estoque",
      value: stockQuantity ?? (getProductData?.product.stockQuantity || 0),
      onChangeValue: setStockQuantity,
      icon: <InventoryIcon />,
      type: "number-integer",
    },
    {
      label: "Preço Unitário (R$)",
      value: unitPrice ?? (getProductData?.product.unitPrice || 0.0),
      onChangeValue: setUnitPrice,
      icon: <AttachMoneyIcon />,
      type: "number",
    },
    {
      label: "Posição no Estoque",
      value: positionInStock || getProductData?.product.positionInStock || "",
      onChangeValue: setPositionInStock,
      icon: <LocationOnIcon />,
      type: "text",
    },
    {
      label: "Estoque Ideal Mínimo",
      value:
        minimumIdealStock ?? (getProductData?.product.minimumIdealStock || 0),
      onChangeValue: setMinimumIdealStock,
      icon: <CampaignIcon />,
      type: "number-integer",
    },
    {
      label: "Custo de Produção (R$)",
      value: productionCost ?? (getProductData?.product.productionCost || 0.0),
      onChangeValue: setProductionCost,
      icon: <AttachMoneyIcon />,
      type: "number",
    },
    {
      label: "Categorias",
      value: categories,
      onChangeValue: setCategories,
      icon: <LocalOfferIcon />,
      type: "select",
      options: categoriesOptions,
    },
    {
      label: "Fornecedores",
      value: suppliers,
      onChangeValue: setSuppliers,
      icon: <PersonIcon />,
      type: "select",
      options: suppliersOptions,
    },
  ];

  return (
    <>
      <PutPage
        descriptionCardProps={{
          name: getProductData?.product.name || "",
          description: getProductData?.product.description || "",
          avatarImage: getProductData?.product.image || "",
          onNameChange: (newName) => {
            setName(newName);
          },
          onDescriptionChange: (newDescription) => {
            setDescription(newDescription);
          },
          onAvatarImageChange: (newImage) => {
            setAvatarImage(newImage);
          },
        }}
        isMobile={isMobile}
        listInputs={listInputs}
        isLoading={
          isLoaded &&
          getProductIsLoading &&
          listCategoriesLoading &&
          listSuppliersLoading &&
          updateProductLoading &&
          isFetching
        }
        putButton={
          <DefaultButton
            disable={isFetching}
            onClick={async () => {
              await refetch();

              if (isError) {
                toast.error("Erro ao atualizar o produto");
              } else if (!isFetching) {
                toast.success("Produto atualizado com sucesso");
                router.push(`/products/${id}`);
              }
            }}
            isMobile={isMobile}
            text="Salvar"
          />
        }
      />
    </>
  );
}
