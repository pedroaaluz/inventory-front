"use client";
import SelectInput from "@/components/selectInput";
import { useState } from "react";
import { IListProductsOutput } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import DefaultButton from "@/components/defaultButton";
import {
  Grid,
  TextField,
  Autocomplete,
  Typography,
  Box,
  Button,
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

export default function CreateMovementsPage() {
  const isSmallScreen = useIsSmallScreen();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [movementsToCreate, setMovementsToCreate] = useState<
    {
      productId: string;
      productName: string;
      quantity: number;
      type: string;
      cost: number;
      paymentMethod: string;
    }[]
  >([]);
  const [newMovement, setNewMovement] = useState({
    productId: "",
    productName: "",
    quantity: 0,
    type: "",
    cost: 0,
    paymentMethod: "",
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: async (): Promise<IListProductsOutput> => {
      const params = { userId: user?.id, search: searchQuery, pageSize: "10" };
      const paramsParsed = handleQueryParams(params);

      const response = await fetch(`/api/products?${paramsParsed}`);
      return response.json() as Promise<IListProductsOutput>;
    },
    enabled: !!searchQuery,
  });

  const handleAddMovement = () => {
    if (
      !newMovement.paymentMethod &&
      translateMovementType(newMovement.type, "en") === "SALE"
    ) {
      toast.error("Selecione uma forma de pagamento");
      return;
    }

    if (!newMovement.productId) {
      toast.error("Selecione um produto");
      return;
    }

    setMovementsToCreate((prev) => [
      ...prev,
      {
        ...newMovement,
        type: translateMovementType(newMovement.type, "en")!,
        paymentMethod: translatePaymentMethod(newMovement.paymentMethod, "en")!,
      },
    ]);

    setNewMovement(newMovement);
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
          style={{
            minWidth: isSmallScreen ? 400 : 220,
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
            minWidth: isSmallScreen ? 400 : 120,
            width: "100%",
            maxWidth: isSmallScreen ? "100%" : 120,
          }}
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              return;
            }

            setNewMovement({
              ...newMovement,
              quantity: Number(e.target.value),
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
          value={translateMovementType(newMovement.type, "en")!}
          onChange={(e) =>
            setNewMovement({
              ...newMovement,
              type: translateMovementType(e.target.value, "pt-br")!,
            })
          }
        />
      ),
    },
    {
      title: "Custo de movimentação",
      objectKey: "cost",
      field: (
        <TextField
          type="number"
          value={newMovement.cost}
          style={{
            minWidth: isSmallScreen ? 400 : 120,
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
              cost: Number(e.target.value),
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
          value={translatePaymentMethod(newMovement.paymentMethod, "en")!}
          onChange={(e) =>
            setNewMovement({
              ...newMovement,
              paymentMethod: translatePaymentMethod(e.target.value, "pt-br")!,
            })
          }
        />
      ),
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
            onClick={() => {}}
          >
            Criar movimentações
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
