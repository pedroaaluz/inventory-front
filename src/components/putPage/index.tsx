import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import DescriptionCardEdit from "./descriptionCardEdit";
import InputList from "./inputList";
import { InputField } from "@/types/putPage";

export default function PutPage({
  isMobile,
  descriptionCardProps,
  listInputs,
  isLoading,
  putButton,
}: {
  isMobile: boolean;
  descriptionCardProps: {
    avatarImage?: string;
    name?: string;
    description?: string;
    onNameChange: (newName: string) => void;
    onDescriptionChange?: (newDescription: string) => void;
    onAvatarImageChange: (newImage: string) => void;
  };
  listInputs: InputField[];
  isLoading?: boolean;
  putButton: JSX.Element;
}) {
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Carregando...
          </Typography>
        </Box>
      ) : (
        <Grid paddingX={2} container spacing={2}>
          <Grid item xs={12}>
            <DescriptionCardEdit
              isMobile={isMobile}
              avatarImage={descriptionCardProps.avatarImage}
              name={descriptionCardProps.name}
              description={descriptionCardProps.description}
              onNameChange={descriptionCardProps.onNameChange}
              onAvatarImageChange={descriptionCardProps.onAvatarImageChange}
              onDescriptionChange={descriptionCardProps.onDescriptionChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                ...(isMobile && {
                  alignItems: "center",
                  justifyContent: "center",
                }),

                width: "100%",
                flexDirection: "column",
              }}
            >
              <InputList isMobile={isMobile} listItems={listInputs} />
            </Box>

            {putButton}
          </Grid>
        </Grid>
      )}
    </>
  );
}
