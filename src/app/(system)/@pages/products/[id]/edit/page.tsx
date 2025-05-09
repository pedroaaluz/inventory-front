"use client";
import PutPage from "@/components/putPage";
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
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsSmallScreen();
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

  const [activeUpdate, setActiveUpdate] = useState(false);

  const [productData, setProductData] = useState<{
    name: string;
    description: string | null;
    avatarImage: string | null;
    stockQuantity: number | undefined;
    unitPrice: number | undefined;
    positionInStock: string | null;
    minimumIdealStock: number | undefined | null;
    productionCost: number | undefined;
    categories: { name: string; id: string }[];
    categoriesOptions: { name: string; id: string }[];
    suppliers: { name: string; id: string }[];
    suppliersOptions: { name: string; id: string }[];
  }>({
    name: "",
    description: "",
    avatarImage: "",
    stockQuantity: undefined,
    unitPrice: undefined,
    positionInStock: "",
    minimumIdealStock: undefined,
    productionCost: undefined,
    categories: [],
    categoriesOptions: [],
    suppliers: [],
    suppliersOptions: [],
  });

  const {
    isLoading: updateProductLoading,
    refetch,
    isError,
    isRefetching,
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
            name: productData.name,
            description: productData.description,
            image: productData.avatarImage,
            stockQuantity: productData.stockQuantity,
            unitPrice: productData.unitPrice,
            positionInStock: productData.positionInStock,
            minimumIdealStock: productData.minimumIdealStock,
            productionCost: productData.productionCost,
            categoriesIds: productData.categories.map(
              (category) => category.id
            ),
            suppliersIds: productData.suppliers.map((supplier) => supplier.id),
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

  const handleProductChange = (key: string, value: any) => {
    setProductData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleMessageDisable = (
    isLoading: boolean,
    isActive: boolean,
    message: string
  ) => {
    if (isLoading) {
      return undefined;
    } else if (!isActive) {
      return message;
    }
  };

  useEffect(() => {
    if (getProductData) {
      const mappedCategories = getProductData.product.categories.map(
        (category) => ({
          name: category.name,
          id: category.id,
        })
      );

      const mappedSuppliers = getProductData.product.suppliers.map(
        (supplier) => ({
          name: supplier.name,
          id: supplier.id,
        })
      );

      handleProductChange("suppliers", mappedSuppliers);
      handleProductChange("categories", mappedCategories);

      setProductData({
        name: getProductData.product.name,
        description: getProductData.product.description,
        avatarImage: getProductData.product.image,
        stockQuantity: getProductData.product.stockQuantity,
        unitPrice: getProductData.product.unitPrice,
        positionInStock: getProductData.product.positionInStock,
        minimumIdealStock: getProductData.product.minimumIdealStock,
        productionCost: getProductData.product.productionCost,
        categories: mappedCategories,
        categoriesOptions: [],
        suppliers: mappedSuppliers,
        suppliersOptions: [],
      });
    }

    if (listCategoriesData) {
      const mappedCategoriesOptions = listCategoriesData.categories?.map(
        (category) => ({
          name: category.name,
          id: category.id,
        })
      );

      handleProductChange("categoriesOptions", mappedCategoriesOptions || []);
    }

    if (listSuppliersData) {
      const mappedSuppliersOptions = listSuppliersData.suppliers?.map(
        (supplier) => ({
          name: supplier.name,
          id: supplier.id,
        })
      );

      handleProductChange("suppliersOptions", mappedSuppliersOptions || []);
    }
  }, [getProductData, listCategoriesData, listSuppliersData]);

  const listInputs: InputField[] = [
    {
      label: "Quantidade em Estoque",
      value: productData.stockQuantity,
      onChangeValue: (value: number | undefined) => {
        setActiveUpdate(true);
        handleProductChange("stockQuantity", value);
      },
      icon: <InventoryIcon />,
      type: "number-integer",
    },
    {
      label: "Preço Unitário (R$)",
      value: productData.unitPrice,
      onChangeValue: (value: number | undefined) => {
        setActiveUpdate(true);
        handleProductChange("unitPrice", value);
      },
      icon: <AttachMoneyIcon />,
      type: "number",
    },
    {
      label: "Posição no Estoque",
      value: productData.positionInStock || "",
      onChangeValue: (value: string) => {
        setActiveUpdate(true);
        handleProductChange("positionInStock", value);
      },
      icon: <LocationOnIcon />,
      type: "text",
    },
    {
      label: "Estoque Ideal Mínimo",
      value: productData.minimumIdealStock || undefined,
      onChangeValue: (value?: number) => {
        setActiveUpdate(true);
        handleProductChange("minimumIdealStock", value);
      },
      icon: <CampaignIcon />,
      type: "number-integer",
    },
    {
      label: "Custo de Produção (R$)",
      value: productData.productionCost,
      onChangeValue: (value: number | undefined) => {
        setActiveUpdate(true);
        handleProductChange("productionCost", value);
      },
      icon: <AttachMoneyIcon />,
      type: "number",
    },
    {
      label: "Categorias",
      value: productData.categories,
      onChangeValue: (value: { name: string; id: string }[]) => {
        setActiveUpdate(true);
        handleProductChange("categories", value);
      },
      icon: <LocalOfferIcon />,
      type: "select",
      options: productData.categoriesOptions,
    },
    {
      label: "Fornecedores",
      value: productData.suppliers,
      onChangeValue: (value: { name: string; id: string }[]) => {
        setActiveUpdate(true);
        handleProductChange("suppliers", value);
      },
      icon: <PersonIcon />,
      type: "select",
      options: productData.suppliersOptions,
    },
  ];

  return (
    <>
      <PutPage
        descriptionCardProps={{
          name: productData.name,
          description: productData.description || "",
          avatarImage: productData.avatarImage || "",
          onNameChange: (newName) => {
            setActiveUpdate(true);
            handleProductChange("name", newName);
          },
          onDescriptionChange: (newDescription) => {
            setActiveUpdate(true);
            handleProductChange("description", newDescription);
          },
          onAvatarImageChange: (newImage) => {
            setActiveUpdate(true);
            handleProductChange("avatarImage", newImage);
          },
        }}
        isMobile={isMobile}
        listInputs={listInputs}
        isLoading={
          getProductIsLoading ||
          listCategoriesLoading ||
          listSuppliersLoading ||
          updateProductLoading
        }
        putButton={
          <DefaultButton
            disable={updateProductLoading || isRefetching || !activeUpdate}
            disableText={handleMessageDisable(
              isRefetching,
              activeUpdate,
              "Nenhuma alteração realizada"
            )}
            onClick={async () => {
              setActiveUpdate(false);
              await refetch();

              if (isError) {
                toast.error("Erro ao atualizar o produto");
              } else if (!updateProductLoading) {
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
