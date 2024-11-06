"use client";
import PutPage from "@/components/putPage";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  IGetSupplierResponse,
  IUpdateSupplierResponse,
} from "@/types/suppliers";
import { useQuery } from "@tanstack/react-query";
import { InputField } from "@/types/putPage";
import { useUser } from "@clerk/nextjs";
import DefaultButton from "@/components/defaultButton";
import { toast } from "sonner";
import removeNulls from "@/utils/removeNulls";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { formatCNPJ, formatPhone } from "@/utils/formatInput";

export default function SuppliersPage() {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsSmallScreen();
  const { user } = useUser();
  const router = useRouter();

  const [supplierData, setSupplierData] = useState<
    Record<string, string | null>
  >({
    name: null,
    avatarImage: null,
    cnpj: null,
    address: null,
    phone: null,
    email: null,
  });

  const { isLoading: getSupplierIsLoading, data: getSupplierData } = useQuery({
    queryKey: ["Suppliers", id],
    queryFn: async (): Promise<IGetSupplierResponse> => {
      const response = await fetch(`/api/suppliers/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseParsed = (await response.json()) as IGetSupplierResponse;

      setSupplierData({
        name: responseParsed.supplier.name,
        avatarImage: responseParsed.supplier.image,
        cnpj: responseParsed.supplier.cnpj,
        address: responseParsed.supplier.address,
        phone: responseParsed.supplier.phone,
        email: responseParsed.supplier.email,
      });

      return responseParsed;
    },
  });

  const [activeUpdate, setActiveUpdate] = useState(false);

  const {
    isLoading: updateSuppliersLoading,
    refetch,
    isError,
    isRefetching,
  } = useQuery({
    queryKey: ["updateSuppliers"],
    queryFn: async (): Promise<IUpdateSupplierResponse> => {
      const response = await fetch(`/api/suppliers/update`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          removeNulls({
            id,
            userId: user?.id,
            name: supplierData.name,
            image: supplierData.avatarImage,
            cnpj: supplierData.cnpj,
            address: supplierData.address,
            phone: supplierData.phone,
            email: supplierData.email,
          })
        ),
      });
      const responseParsed = (await response.json()) as IUpdateSupplierResponse;

      if (responseParsed.status !== 200) {
        throw new Error("Erro ao atualizar o fornecedor");
      }

      return responseParsed;
    },
  });

  const handleSuppliersChange = (key: string, value: any) => {
    setSupplierData((prevState) => ({
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

  const listInputs: InputField[] = [
    {
      label: "CNPJ",
      value: formatCNPJ(supplierData.cnpj || ""),
      onChangeValue: (value: string) => {
        setActiveUpdate(true);
        handleSuppliersChange("cnpj", value);
      },

      icon: <PersonIcon />,
      type: "text",
    },
    {
      label: "Endereço",
      value: supplierData.address || "",
      onChangeValue: (value: string) => {
        setActiveUpdate(true);
        handleSuppliersChange("address", value);
      },
      icon: <LocationOnIcon />,
      type: "text",
    },

    {
      label: "Telefone",
      value: formatPhone(supplierData.phone || ""),
      onChangeValue: (value: string) => {
        setActiveUpdate(true);

        handleSuppliersChange("phone", value);
      },
      icon: <PhoneIcon />,
      type: "text",
    },

    {
      label: "Email",
      value: supplierData.email || "",
      onChangeValue: (value: string) => {
        setActiveUpdate(true);
        handleSuppliersChange("email", value);
      },
      icon: <EmailIcon />,
      type: "text",
    },
  ];

  return (
    <>
      <PutPage
        descriptionCardProps={{
          name: supplierData.name || "",
          avatarImage: supplierData.avatarImage || "",
          onNameChange: (newName) => {
            setActiveUpdate(true);
            handleSuppliersChange("name", newName);
          },
          onAvatarImageChange: (newImage) => {
            setActiveUpdate(true);
            handleSuppliersChange("avatarImage", newImage);
          },
        }}
        isMobile={isMobile}
        listInputs={listInputs}
        isLoading={getSupplierIsLoading}
        putButton={
          <DefaultButton
            disable={updateSuppliersLoading || isRefetching || !activeUpdate}
            disableText={handleMessageDisable(
              isRefetching,
              activeUpdate,
              "Nenhuma alteração realizada"
            )}
            onClick={async () => {
              setActiveUpdate(false);
              await refetch();

              if (isError) {
                toast.error("Erro ao atualizar o fornecedor");
              } else if (!updateSuppliersLoading) {
                toast.success("fornecedor atualizado com sucesso");
                router.push(`/suppliers/${id}`);
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
