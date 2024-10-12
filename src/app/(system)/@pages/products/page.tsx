"use client";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Box,
  CircularProgress,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { IListProductsOutput } from "../../../../types/products";
import { useUser } from "@clerk/nextjs";
import PaymentMethodPierCharts from "@/components/paymentMethodPierCharts/paymentMethodPierCharts";
import { handleQueryParams } from "@/utils/handleQueryParams";

export default function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];

  const [filterName, setFilterName] = useState("");
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  const [appliedFilters, setAppliedFilters] = useState({
    filterName: "",
    startDate: formattedSevenDaysAgo,
    endDate,
  });

  const [page, setPage] = useState(1);

  const { user, isLoaded } = useUser();

  const handleSubmit = () => {
    setAppliedFilters({
      filterName,
      startDate,
      endDate,
    });
  };

  const { isLoading, data, isFetching } = useQuery({
    queryKey: [
      "products",
      page,
      isLoaded,
      appliedFilters.filterName,
      appliedFilters.startDate,
      appliedFilters.endDate,
    ],
    queryFn: async (): Promise<IListProductsOutput> => {
      const params = {
        userId: user?.id,
        page: page.toString(),
        pageSize: "10",
        name: appliedFilters.filterName,
        startDate: appliedFilters.startDate || undefined,
        endDate: appliedFilters.endDate || undefined,
      };

      const paramsParsed = handleQueryParams(params);

      const response = await fetch(
        `/api/products?${paramsParsed}&pageSize=10`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseParsed = (await response.json()) as IListProductsOutput;

      return responseParsed;
    },
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Grid container spacing={2} paddingLeft={5}>
      <Grid item xs={12}>
        <Box style={{ padding: 16, marginBottom: 16, borderColor: "none" }}>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={2}
            alignItems="center"
          >
            <TextField
              label="Filtrar por Nome"
              value={filterName}
              style={{
                width: isMobile ? "100%" : "300px",
              }}
              onChange={(e) => setFilterName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Data de Início"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                width: isMobile ? "100%" : "200px",
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="Data de Fim"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{
                width: isMobile ? "100%" : "200px",
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit} // Aplica os filtros ao clicar
              startIcon={<Search />}
            >
              Aplicar Filtros
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box style={{ padding: 26 }}>
            {isLoading || isFetching ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="calc(100vh - 300px)"
              >
                <CircularProgress />
                <Typography variant="h6" style={{ marginLeft: 16 }}>
                  Carregando produtos...
                </Typography>
              </Box>
            ) : (
              <>
                <TableContainer style={{ height: "calc(100vh - 300px)" }}>
                  <Table stickyHeader>
                    {!isMobile && (
                      <TableHead>
                        <TableRow>
                          <TableCell>Nome</TableCell>
                          <TableCell>Preço</TableCell>
                          <TableCell>Quantidade</TableCell>
                          <TableCell>Categoria</TableCell>
                          <TableCell>Posição em estoque</TableCell>
                          <TableCell>Data de criação</TableCell>
                        </TableRow>
                      </TableHead>
                    )}
                    <TableBody>
                      {(data?.products || []).map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar
                                alt={product.name}
                                src="https://dummyimage.com/600x400/000/fff"
                                style={{ marginRight: 8 }}
                              />
                              <Typography>{product.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {isMobile ? (
                              <>
                                <Typography>{`Preço: R$ ${product.unitPrice}`}</Typography>
                                <Typography>{`Quantidade: ${product.stockQuantity}`}</Typography>
                              </>
                            ) : (
                              <Typography>{`R$ ${product.unitPrice}`}</Typography>
                            )}
                          </TableCell>
                          {!isMobile && (
                            <>
                              <TableCell>{product.stockQuantity}</TableCell>
                              <TableCell>
                                {product.categories[0].name}
                              </TableCell>
                              <TableCell>{product.positionInStock}</TableCell>
                              <TableCell>
                                {new Date(product.createdAt).toLocaleString(
                                  "pt-BR",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  }
                                )}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" padding={2}>
                    <Pagination
                      count={data?.totalPages}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: 16,
                  height: 500,
                }}
              >
                <PaymentMethodPierCharts
                  endDate={appliedFilters.endDate}
                  startDate={appliedFilters.startDate}
                  userId={user?.id!}
                  isMobile={isMobile}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: 16,
                  height: "50%",
                }}
              >
                <Typography variant="h4" align="center">
                  R$ 5.000,00
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
