"use client";
import SelectInput from "@/components/selectInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IListProductsOutput } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import {
  Grid,
  TextField,
  Autocomplete,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { handleQueryParams } from "@/utils/handleQueryParams";
import EditableTable from "@/components/editableTable";
import {
  translateMovementType,
  translatePaymentMethod,
} from "@/utils/translators";
import { toast } from "sonner";
import ListCreatePage from "@/components/listCreatePage";
import { queryClient } from "@/services/queryClient";
import removeNulls from "@/utils/removeNulls";

export default function CreateMovementsPage() {
  const isSmallScreen = useIsSmallScreen();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [movementsToCreate, setMovementsToCreate] = useState<
    {
      productId: string;
      productName: string;
      quantity?: number;
      type: string;
      cost?: number;
      paymentMethod: string;
      messageError?: string;
      color?: {
        bg: string;
      };
    }[]
  >([]);

  const [newMovement, setNewMovement] = useState<{
    productId: string;
    productName: string;
    quantity?: number;
    type: string;
    cost?: number;
    paymentMethod: string;
  }>({
    productId: "",
    productName: "",
    quantity: undefined,
    type: "",
    cost: undefined,
    paymentMethod: "",
  });

  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: async (): Promise<IListProductsOutput> => {
      const params = { userId: user?.id, name: searchQuery, pageSize: "10" };
      const paramsParsed = handleQueryParams(params);

      const response = await fetch(`/api/products?${paramsParsed}`);

      return response.json() as Promise<IListProductsOutput>;
    },
  });

  const {
    isRefetching: createMovementsIsRefetching,
    isLoading: createMovementsIsLoading,
    refetch: createMovementsRefetch,
    isError,
    data: createMovementsData,
  } = useQuery({
    queryKey: ["createMovements", searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/movements/create`, {
        method: "post",
        body: JSON.stringify({
          userId: user?.id,
          movements: movementsToCreate.map((movement) => removeNulls(movement)),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Erro ao criar movimentações");
      }

      const result = await response.json();

      if (result.movementsInvalid.length > 0) {
        setMovementsToCreate(
          result.movementsInvalid.map((movement: any) => ({
            ...movementsToCreate[movement.index],
            messageError: "Estoque insuficiente",
            color: {
              bg: "#f8d7da",
            },
          }))
        );

        toast.error("Há movimentações inválidas");

        if (result.movementsCreated.length > 0) {
          toast.success("Movimentações válidas foram criadas!");
        }

        return result;
      }

      toast.success("Movimentações criadas com sucesso");

      router.push("/movements");

      return result;
    },
    enabled: false,
  });

  const handleAddMovement = () => {
    if (!newMovement.paymentMethod && newMovement.type === "SALE") {
      toast.error("Selecione uma forma de pagamento");
      return;
    }

    if (!newMovement.productId) {
      toast.error("Selecione um produto");
      return;
    }

    setMovementsToCreate((prev) => [
      {
        ...newMovement,
        type: newMovement.type,
        paymentMethod: newMovement.paymentMethod,
      },
      ...prev,
    ]);

    setNewMovement({
      productId: "",
      productName: "",
      quantity: undefined,
      type: "",
      cost: undefined,
      paymentMethod: "",
    });
    setSearchQuery("");
  };

  const handleCopy = (index: number) => {
    const copiedMovement = { ...movementsToCreate[index] };
    setMovementsToCreate((prev) => [...prev, copiedMovement]);
  };

  const handleRemove = (index: number) => {
    setMovementsToCreate((prev) => prev.filter((_, i) => i !== index));
  };

  const commonStyles = {
    "& .MuiInputLabel-root": {
      color: "#00585e",
      "&.Mui-focused": {
        color: "#00585e",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00585e",
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#00585e",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#00585e",
        "&.Mui-focused": {
          color: "#00585e",
        },
      },
      "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#00585e",
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00585e",
          },
        },
      },
    },
  };

  const columns = [
    {
      title: "Produto",
      objectKey: "productName",
      field: (
        <Autocomplete
          // @ts-ignore
          value={
            newMovement.productName ? { name: newMovement.productName } : null
          }
          style={{
            width: "100%",
            maxWidth: isSmallScreen ? "100%" : 200,
          }}
          options={data?.products || []}
          getOptionLabel={(option) => option.name || ""}
          onInputChange={(event, newInputValue) => {
            setSearchQuery(newInputValue);
            refetch();
          }}
          onChange={(event, newValue) => {
            setNewMovement((prev) => ({
              ...prev,
              productId: newValue ? newValue.id : "",
              productName: newValue ? newValue.name! : "",
            }));
          }}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#00585e",
                  "&.Mui-focused": { color: "#00585e" },
                },
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00585e",
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00585e",
                      borderWidth: "2px",
                    },
                  },
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
          loadingText="Procurando..."
          noOptionsText="Nada encontrado"
        />
      ),
    },
    {
      title: "Quantidade",
      objectKey: "quantity",
      field: (
        <TextField
          type="number"
          value={newMovement.quantity}
          sx={{
            ...commonStyles,
            width: "100%",
            maxWidth: isSmallScreen ? "100%" : 120,
          }}
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              return;
            }

            setNewMovement({
              ...newMovement,
              quantity: e.target.value ? Number(e.target.value) : undefined,
            });
          }}
        />
      ),
    },
    {
      title: "Tipo de movimentação",
      objectKey: "type",
      field: (
        <SelectInput
          items={[
            {
              label: "Venda",
              value: "SALE",
            },
            {
              label: "Adição ao estoque",
              value: "ADD_TO_STOCK",
            },
            {
              label: "Remoção do estoque",
              value: "REMOVE_FROM_STOCK",
            },
          ]}
          value={newMovement.type}
          onChange={(e) =>
            setNewMovement({
              ...newMovement,
              type: e.target.value,
            })
          }
        />
      ),
      transform: (value: string) => translateMovementType(value, "pt-br")!,
    },
    {
      title: "Custo de movimentação",
      objectKey: "cost",
      field: (
        <TextField
          type="number"
          value={newMovement.cost}
          style={{
            width: "100%",
            maxWidth: isSmallScreen ? "100%" : 120,
          }}
          sx={{
            ...commonStyles,
          }}
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              return;
            }

            setNewMovement({
              ...newMovement,
              cost: e.target.value ? Number(e.target.value) : undefined,
            });
          }}
        />
      ),
    },
    {
      title: "Forma de pagamento",
      objectKey: "paymentMethod",
      field: (
        <SelectInput
          items={[
            {
              label: "Dinheiro",
              value: "CASH",
            },
            {
              label: "Crédito",
              value: "CREDIT",
            },
            {
              label: "Débito",
              value: "DEBIT",
            },
            {
              label: "Pix",
              value: "PIX",
            },
            {
              label: "Nenhum",
              value: "",
            },
          ]}
          value={newMovement.paymentMethod}
          onChange={(e) =>
            setNewMovement({
              ...newMovement,
              paymentMethod: e.target.value,
            })
          }
        />
      ),
      transform: (value: string) => translatePaymentMethod(value, "pt-br")!,
    },
    {
      title: "Feedback de criação",
      objectKey: "messageError",
    },
  ];

  return (
    <Grid paddingX={5} marginTop={isSmallScreen ? 5 : 0} container spacing={5}>
      <Grid item xs={12} md={12}>
        <Typography textAlign={"center"} variant="h4" sx={{ color: "#00585e" }}>
          Criação de Movimentações
        </Typography>
      </Grid>

      {isSmallScreen ? (
        <Grid item xs={12}>
          <ListCreatePage
            actionsRows={{
              remove: handleRemove,
              copy: handleCopy,
              create: handleAddMovement,
            }}
            data={movementsToCreate}
            list={columns}
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <EditableTable
            columns={columns}
            actionsRows={{
              remove: handleRemove,
              copy: handleCopy,
              create: handleAddMovement,
            }}
            data={movementsToCreate}
          />
        </Grid>
      )}
      <Grid item xs={12} md={12}>
        <Box
          style={{
            marginBottom: 16,
            borderColor: "none",
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: isSmallScreen ? "100%" : 400,
              backgroundColor: "#00585e",
              height: isSmallScreen ? 56 : 60,
              "&.Mui-disabled": {
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: "#007b80",
              },
            }}
            onClick={async () => {
              await createMovementsRefetch();
              if (isError) {
                toast.error("Erro ao criar movimentações");
                return;
              }

              await queryClient.invalidateQueries({
                queryKey: ["movements"],
              });

              await queryClient.invalidateQueries({
                queryKey: ["paymentMethodUsed"],
              });
            }}
            disabled={movementsToCreate.length === 0}
          >
            {createMovementsIsLoading || createMovementsIsRefetching ? (
              <>
                <CircularProgress color="inherit" />
              </>
            ) : (
              "Criar movimentações"
            )}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
