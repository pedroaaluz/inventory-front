import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import HeaderSearchBar from "../header/headerSearchBar";
import HeaderActionButton from "../header/headerActionButton";
import ResponsiveTable from "@/components/responsiveTable";
import HeaderText from "../header/headerText";
import { IResponsiveTableProps } from "../../../types/tableResponsive";
import { Dispatch, ReactElement, SetStateAction } from "react";

export default function PageContent({
  headerContent: { headerSearchBar, headerTittle, headerActionButton },
  tableConfig,
  dashboardDown,
  dashboardUp,
  isSmallScreen,
}: {
  headerContent: {
    headerSearchBar: {
      inputs: {
        value: string | undefined;
        setValue: Dispatch<SetStateAction<string | undefined>>;
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
  isSmallScreen: boolean;
}) {
  return (
    <Grid
      container
      spacing={3}
      padding={isSmallScreen ? 3 : 2}
      alignItems="center"
      justifyContent={isSmallScreen ? "center" : "flex-start"}
    >
      {isSmallScreen && (
        <Grid item xs={12}>
          <HeaderText text={headerTittle} />
        </Grid>
      )}

      <Grid
        container
        spacing={isSmallScreen ? 1 : 3}
        justifyContent={isSmallScreen ? "center" : "flex-start"}
      >
        <Grid item xs={12} md={9} order={isSmallScreen ? 2 : 1}>
          <HeaderSearchBar
            inputs={headerSearchBar.inputs}
            handleSubmit={headerSearchBar.handleSubmit}
            isMobile={isSmallScreen}
          />
        </Grid>
        <Grid item xs={12} md={3} order={isSmallScreen ? 1 : 2}>
          <HeaderActionButton
            isMobile={isSmallScreen}
            onClick={headerActionButton.onClick}
            text={headerActionButton.text}
            icon={headerActionButton.icon}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent={isSmallScreen ? "center" : "flex-start"}
      >
        <Grid item xs={12} md={9}>
          <Box
            style={{
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            <ResponsiveTable
              isLoading={tableConfig.isLoading}
              isFetching={tableConfig.isFetching}
              data={tableConfig.data}
              isMobile={isSmallScreen}
              page={tableConfig.page}
              handlePageChange={tableConfig.handlePageChange}
              columns={tableConfig.columns}
              columnsShowInResponsive={tableConfig.columnsShowInResponsive}
              totalPages={tableConfig.totalPages || 1}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="1px solid #ddd"
                padding={2}
                height={isSmallScreen ? 400 : 350}
                maxWidth="100%"
                overflow="hidden"
              >
                {dashboardUp}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                border="1px solid #ddd"
                padding={2}
                height={isSmallScreen ? 400 : 350}
                maxWidth="100%"
                overflow="auto"
                flexDirection="column"
                justifyContent="center"
                alignItems={isSmallScreen ? "center" : "flex-start"} // Centralize verticalmente quando for tela pequena
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
