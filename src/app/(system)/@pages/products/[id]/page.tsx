"use client";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  CardMedia,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { IGetProductOutput } from "../../../../../types/products";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<IGetProductOutput> => {
      console.log(id);
      const response = await fetch(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseParsed = (await response.json()) as IGetProductOutput;

      return responseParsed;
    },
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const listItems = [
    {
      name: "Categoria",
      value: data?.product.categories
        ?.map((category) => category.name)
        .join(", "),
      icon: <AccessTime />,
    },
    {
      name: "Fornecedor",
      value: data?.product.suppliers
        ?.map((supplier) => supplier.name)
        .join(", "),
      icon: <AccessTime />,
    },
    {
      name: "Quantidade em Estoque",
      value: data?.product.stockQuantity,
      icon: <AccessTime />,
    },
    {
      name: "Preço Unitário",
      value: `$${data?.product.unitPrice}`,
      icon: <AccessTime />,
    },
    {
      name: "Custo de Compra",
      value: `$${data?.product.productionCost}`,
      icon: <AccessTime />,
    },
    ...(data?.product.positionInStock
      ? [
          {
            name: "Posição no Estoque",
            value: data.product.positionInStock,
            icon: <AccessTime />,
          },
        ]
      : []),
    ...(data?.product.minimumIdealStock
      ? [
          {
            name: "Estoque Minimo Ideal",
            value: data.product.minimumIdealStock,
            icon: <AccessTime />,
          },
        ]
      : []),
    {
      name: "Criado em",
      value: new Date(data?.product.createdAt!).toLocaleDateString(),
      icon: <AccessTime />,
    },
    ...(data?.product.updatedAt
      ? [
          {
            name: "Atualizado em",
            value: new Date(data.product.updatedAt).toLocaleDateString(),
            icon: <AccessTime />,
          },
        ]
      : []),
  ];

  return (
    <Grid container spacing={1} paddingLeft={isMobile ? 0 : 5}>
      <Grid item xs={12} direction={"row"}>
        <Card
          variant="outlined"
          sx={{ display: "flex", alignItems: "center", border: "none" }}
        >
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              sx={{ borderRadius: "50%" }}
            />
          ) : (
            <CardMedia
              component="img"
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
              }}
              image={
                data?.product.image || "https://dummyimage.com/600x400/000/fff"
              }
              alt="Product image"
            />
          )}
          <CardContent sx={{ flex: "1 0 auto" }}>
            {isLoading ? (
              <Skeleton width="20%" height={32} />
            ) : (
              <Typography component="div" variant="h5">
                {data?.product.name}
              </Typography>
            )}
            {isLoading ? (
              <Skeleton width="20%" height={24} sx={{ mt: 1 }} />
            ) : (
              <Typography
                variant="subtitle1"
                component="div"
                width={isMobile ? "100%" : "60%"}
                sx={{ color: "text.secondary" }}
              >
                {data?.product.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid container xs={12}>
        <Grid item xs={12} md={3}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Skeleton variant="rectangular" width="100%" height={56} />
              </>
            ) : (
              <>
                {listItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>{item.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={item.value} />
                  </ListItem>
                ))}
              </>
            )}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}
