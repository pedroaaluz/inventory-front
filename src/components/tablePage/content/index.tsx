import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
import HeaderSearchBar from "../header/headerSearchBar";
import HeaderActionButton from "../header/headerActionButton";
import ResponsiveTable from "@/components/responsiveTable";
import HeaderText from "../header/headerText";
import { IResponsiveTableProps } from "../../../types/tableResponsive";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export default function PageContent({
  headerContent: { headerSearchBar, headerTittle, headerActionButton },
  tableConfig,
  dashboardDown,
  dashboardUp,
}: {
  headerContent: {
    headerSearchBar: {
      inputs: (
        | {
            value: string;
            setValue: Dispatch<SetStateAction<string>>;
            label: string;
            type: "text" | "date";
            minValue?: string;
          }
        | {
            value: string;
            setValue: (event: SelectChangeEvent) => void;
            label: string;
            type: "select";
            options: string[];
          }
        | {
            value: string;
            setValue: Dispatch<SetStateAction<string>>;
            label: string;
            type: "autocomplete";
            options: any[];
            getOptionLabel: (option: any) => string;
            onInputChange?: (event: any, newInputValue: string) => void;
            onChange?: (event: any, newValue: any) => void;
            loading?: boolean;
          }
      )[];
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
  dashboardUp?: ReactElement;
  dashboardDown?: ReactElement;
}) {
  const isSmallScreen = useIsSmallScreen();

  return (
    <Grid container paddingX={2} spacing={3} paddingTop={isSmallScreen ? 5 : 0}>
      {isSmallScreen && (
        <Grid item xs={12}>
          <HeaderText text={headerTittle} />
        </Grid>
      )}
      <Grid item xs={12} md={12} container justifyContent={"center"}>
        <Grid item xs={12} md={9}>
          <HeaderSearchBar
            inputs={headerSearchBar.inputs}
            handleSubmit={headerSearchBar.handleSubmit}
            isMobile={isSmallScreen}
          />
        </Grid>
        <Grid item xs={12} md={3} justifyContent={"center"}>
          <HeaderActionButton
            isMobile={isSmallScreen}
            onClick={headerActionButton.onClick}
            text={headerActionButton.text}
            icon={headerActionButton.icon}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={dashboardDown || dashboardUp ? 9 : 12}>
        <ResponsiveTable
          tableTittle={tableConfig.tableTittle}
          isLoading={tableConfig.isLoading}
          isFetching={tableConfig.isFetching}
          data={tableConfig.data}
          isMobile={isSmallScreen}
          page={tableConfig.page}
          handlePageChange={tableConfig.handlePageChange}
          columns={tableConfig.columns}
          columnsShowInResponsive={tableConfig.columnsShowInResponsive}
          totalPages={tableConfig.totalPages || 1}
          height={tableConfig.height}
        />
      </Grid>
      {(dashboardDown || dashboardUp) && (
        <Grid container item xs={12} md={3} spacing={2}>
          {dashboardUp && (
            <Grid item xs={12}>
              {dashboardUp}
            </Grid>
          )}
          {dashboardDown && (
            <Grid item xs={12}>
              {dashboardDown}
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}
