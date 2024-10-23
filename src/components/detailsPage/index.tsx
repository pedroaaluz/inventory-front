import { Grid } from "@mui/material";
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
      paddingLeft={isMobile ? 0 : 5}
    >
      <Grid item xs={12} direction={"row"}>
        <DescriptionCard
          isMobile={isMobile}
          avatarImage={image ?? undefined}
          isLoading={isLoading}
          name={name!}
          description={description ?? undefined}
        />
      </Grid>
      <Grid container xs={12}>
        <Grid item xs={12} md={3}>
          <EntityDetailsList isLoading={isLoading} listItems={details} />
          {!isLoading && (
            <DefaultButton
              text={text}
              isMobile={isMobile}
              icon={icon}
              onClick={onClick}
            />
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          {dashBoardUp}
        </Grid>
      </Grid>
    </Grid>
  );
}
