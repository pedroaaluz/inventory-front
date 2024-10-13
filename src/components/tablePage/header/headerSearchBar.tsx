import { Box, Button, Grid } from "@mui/material";
import HeaderInput from "./headerInput";
import { Search } from "@mui/icons-material";

export default function HeaderSearchBar({
  filterName,
  setFilterName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSubmit,
  isMobile,
}: {
  filterName: string;
  setFilterName: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  handleSubmit: () => void;
  isMobile: boolean;
}) {
  return (
    <Grid item xs={isMobile ? false : 12} md={isMobile ? false : 9}>
      <Box style={{ padding: 16, marginBottom: 16, borderColor: "none" }}>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          gap={2}
          alignItems="center"
        >
          <HeaderInput
            text="Filtrar por Nome"
            isMobile={isMobile}
            value={filterName}
            setValue={setFilterName}
            type="text"
          />
          <HeaderInput
            text="Data de Início"
            isMobile={isMobile}
            value={startDate}
            setValue={setStartDate}
            type="date"
          />
          <HeaderInput
            text="Data de Fim"
            isMobile={isMobile}
            value={endDate}
            setValue={setEndDate}
            type="date"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<Search />}
            style={{
              backgroundColor: "#00585e",
              height: 56,
            }}
          >
            Pesquisar
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
