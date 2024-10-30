import { Box, Button, Grid } from "@mui/material";
import DefaultButton from "../defaultButton";
import DescriptionCard from "./descriptionCard";
import EntityDetailsList from "./entityDetailsList";

export default function DetailsPage({
  isMobile,
  isLoading,
  dashBoardUp,
  entity: { name, description, image, details },
  button: { text, icon, onClick },
}: {
  isMobile: boolean;
  isLoading: boolean;
  dashBoardUp: JSX.Element;
  entity: {
    name?: string;
    description?: string | null;
    image?: string | null;
    details: { name: string; value?: string | number; icon: JSX.Element }[];
  };
  button: {
    text: string;
    icon: JSX.Element;
    onClick: () => void;
  };
}) {
  return (
    <Grid
      container
      spacing={1}
      paddingTop={isMobile ? 12 : 0}
      justifyContent={isMobile ? "center" : undefined}
      alignItems={isMobile ? "center" : undefined}
      paddingX={isMobile ? 2 : 6}
    >
      <Grid item xs={12}>
        <DescriptionCard
          isMobile={isMobile}
          avatarImage={image ?? undefined}
          isLoading={isLoading}
          name={name!}
          description={description ?? undefined}
        />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} md={3}>
          <EntityDetailsList isLoading={isLoading} listItems={details} />
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <DefaultButton
                text={text}
                isMobile={isMobile}
                icon={icon}
                onClick={onClick}
              />
            </Box>
          )}
        </Grid>
        {isMobile && (
          <Grid item xs={12} md={0}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#00585e",
                height: 56,
                "&.Mui-disabled": {
                  color: "#fff",
                },
                "&:hover": {
                  backgroundColor: "#007b80",
                },
              }}
              onClick={onClick}
              startIcon={icon}
            >
              {text}
            </Button>
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          {dashBoardUp}
        </Grid>
      </Grid>
    </Grid>
  );
}
