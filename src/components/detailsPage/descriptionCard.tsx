import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";

export default function DescriptionCard({
  isMobile,
  avatarImage,
  isLoading,
  name,
  description,
}: {
  isMobile: boolean;
  avatarImage?: string;
  isLoading: boolean;
  name: string;
  description?: string;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        border: "none",
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rounded"
          sx={
            isMobile
              ? { width: "100%", height: 200 }
              : { width: 120, height: 120, borderRadius: "50%" }
          }
        />
      ) : (
        <CardMedia
          component="img"
          sx={
            isMobile
              ? {
                  width: "100%",
                  height: 250,
                }
              : {
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  marginRight: 2,
                }
          }
          image={avatarImage}
          alt="entity image"
        />
      )}
      <CardContent sx={{ textAlign: isMobile ? "center" : "left" }}>
        {isLoading ? (
          <Skeleton width={100} height={32} />
        ) : (
          <Typography color={"#00585e"} variant="h5">
            {name}
          </Typography>
        )}
        {isLoading ? (
          <Skeleton width={100} height={24} sx={{ mt: 1 }} />
        ) : (
          <Typography
            variant="subtitle1"
            width={isMobile ? "100%" : "50%"}
            sx={{ color: "text.secondary" }}
          >
            {description ? description : ""}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
