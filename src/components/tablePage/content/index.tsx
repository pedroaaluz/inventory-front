import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import HeaderSearchBar from "../header/headerSearchBar";
import HeaderActionButton from "../header/headerActionButton";
import ResponsiveTable from "@/components/responsiveTable";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import HeaderText from "../header/headerText";
import { IResponsiveTableProps } from "../../../types/tableResponsive";
import { Dispatch, ReactElement, SetStateAction } from "react";

export default function PageContent({
  headerContent: { headerSearchBar, headerTittle, headerActionButton },
  tableConfig,
  dashboardDown,
  dashboardUp,
}: {
  headerContent: {
    headerSearchBar: {
      inputs: {
        value: string;
        setValue: Dispatch<SetStateAction<string>>;
        label: string;
        type: "text" | "date";
      }[];
      handleSubmit: () => void;
    };
    headerTittle: string;
    headerActionButton: {
      onClick: () => void;
      text: string;
      icon: JSX.Element;
    };
  };
  tableConfig: IResponsiveTableProps;
  dashboardUp: ReactElement;
  dashboardDown: ReactElement;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={2} paddingLeft={isMobile ? 0 : 5}>
      {isMobile && (
        <Grid item xs={12}>
          <HeaderText text={headerTittle} />
        </Grid>
      )}
      <Grid
        container
        direction={isMobile ? "column-reverse" : "row"}
        spacing={2}
      >
        <Grid item xs={isMobile ? false : 12} md={isMobile ? false : 9}>
          <HeaderSearchBar
            inputs={headerSearchBar.inputs}
            handleSubmit={headerSearchBar.handleSubmit}
            isMobile={isMobile}
          />
        </Grid>
        <Grid item xs={isMobile ? false : 12} md={isMobile ? false : 3}>
          <HeaderActionButton
            isMobile={isMobile}
            onClick={headerActionButton.onClick}
            text={headerActionButton.text}
            icon={headerActionButton.icon}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} paddingLeft={isMobile ? 2 : 0}>
        <Grid item xs={12} md={9}>
          <ResponsiveTable
            isLoading={tableConfig.isLoading}
            isFetching={tableConfig.isFetching}
            data={tableConfig.data}
            isMobile={isMobile}
            page={tableConfig.page}
            handlePageChange={tableConfig.handlePageChange}
            columns={tableConfig.columns}
            columnsShowInResponsive={tableConfig.columnsShowInResponsive}
            loadingMessage={tableConfig.loadingMessage}
            totalPages={tableConfig.totalPages || 1}
          />
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
                  height: isMobile ? 500 : 350,
                }}
              >
                {dashboardUp}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                style={{
                  display: "flex",
                  border: "1px solid #ddd",
                  padding: 16,
                  height: isMobile ? 500 : 350,
                }}
                flexDirection={"column"}
              >
                {dashboardDown}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
