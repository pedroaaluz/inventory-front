"use client";
import PutPage from "@/components/putPage";
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
import { TCreateSupplierResponse } from "@/types/suppliers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InputField } from "@/types/putPage";
import { useUser } from "@clerk/nextjs";
import DefaultButton from "@/components/defaultButton";
import { toast } from "sonner";
import removeNulls from "@/utils/removeNulls";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { formatCNPJ, formatPhone } from "@/utils/formatInput";

export default function ProductPage() {
  const isMobile = useIsSmallScreen();
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [supplierData, setSupplierData] = useState({
    name: undefined,
    avatarImage: undefined,
    cnpj: undefined,
    address: undefined,
    phone: undefined,
    email: undefined,
  });

  const [activeCreateApi, setActiveCreateApi] = useState(false);

  const {
    isLoading: createSupplierLoading,
    isError,
    isRefetching,
    data: createSupplierData,
    refetch,
  } = useQuery({
    queryKey: ["createSupplier"],
    queryFn: async (): Promise<TCreateSupplierResponse> => {
      const entry = {
        userId: user?.id,
        name: supplierData.name,
        image: supplierData.avatarImage,
        cnpj: supplierData.cnpj,
        address: supplierData.address,
        phone: supplierData.phone,
        email: supplierData.email,
      };

      const requiredKeys = ["name"] as const;

      for (const key of requiredKeys) {
        if (!entry[key]) {
          toast.warning(
            "Por favor, preencha todos os campos obrigatórios: Nome"
          );

          throw new Error(
            "Por favor, preencha todos os campos obrigatórios: Nome"
          );
        }
      }

      const response = await fetch(`/api/suppliers/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(removeNulls(entry)),
      });

      const responseParsed = (await response.json()) as TCreateSupplierResponse;

      if (responseParsed.status !== 200) {
        throw new Error("Erro ao criar o Fornecedor");
      }

      router.push(`/suppliers/${responseParsed?.supplier.id}`);

      return responseParsed;
    },
    enabled: activeCreateApi,
  });

  const handleSupplierChange = (key: string, value: any) => {
    setSupplierData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const listInputs: InputField[] = [
    {
      label: "CNPJ",
      value: formatCNPJ(supplierData.cnpj || ""),
      onChangeValue: (value: string) => {
        handleSupplierChange("cnpj", value);
      },
      icon: <PersonIcon />,
      type: "text",
    },
    {
      label: "Endereço",
      value: supplierData.address || "",
      onChangeValue: (value: string) => {
        handleSupplierChange("address", value);
      },
      icon: <LocationOnIcon />,
      type: "text",
    },
    {
      label: "Telefone",
      value: formatPhone(supplierData.phone || ""),
      onChangeValue: (value: string) => {
        handleSupplierChange("phone", value);
      },
      icon: <PersonIcon />,
      type: "text",
    },
    {
      label: "Email",
      value: supplierData.email || "",
      onChangeValue: (value: string) => {
        handleSupplierChange("email", value);
      },
      icon: <PersonIcon />,
      type: "text",
    },
  ];

  return (
    <>
      <PutPage
        descriptionCardProps={{
          name: supplierData.name,
          avatarImage: supplierData.avatarImage,
          onNameChange: (newName) => {
            handleSupplierChange("name", newName);
          },
          onAvatarImageChange: (newImage) => {
            handleSupplierChange("avatarImage", newImage);
          },
        }}
        isMobile={isMobile}
        listInputs={listInputs}
        isLoading={createSupplierLoading}
        putButton={
          <DefaultButton
            disable={createSupplierLoading || isRefetching}
            disableText={"Criando Fornecedor!"}
            onClick={async () => {
              setActiveCreateApi(true);
              await refetch();

              if (isError) {
                toast.error("Erro ao criar o Fornecedor");
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
