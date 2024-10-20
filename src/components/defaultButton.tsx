import { Box, Button } from "@mui/material";
import Spinner from "./spinner";

export default function DefaultButton({
  isMobile,
  text,
  onClick,
  icon,
  disable,
  disableText,
}: {
  isMobile: boolean;
  text: string;
  onClick: () => void;
  icon?: JSX.Element;
  disable?: boolean;
  disableText?: string;
}) {
  return (
    <Box
      display="flex"
      gap={2}
      style={{
        padding: 16,
        marginBottom: 16,
        borderColor: "none",
        width: "100%",
      }}
    >
      <Button
        variant="contained"
        startIcon={icon}
        sx={{
          backgroundColor: "#00585e",
          height: isMobile ? 56 : 40,
          width: isMobile ? "100%" : "80%",
          color: disable ? "#fff" : undefined,
          "&.Mui-disabled": {
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#007b80",
          },
        }}
        onClick={onClick}
        disabled={disable}
      >
        {disable ? disableText || <Spinner /> : text}
      </Button>
    </Box>
  );
}
