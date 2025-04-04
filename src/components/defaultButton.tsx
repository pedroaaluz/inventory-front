import { Box, Button } from "@mui/material";
import Spinner from "./spinner";

export default function DefaultButton({
  isMobile,
  text,
  onClick,
  icon,
  disable,
  disableText,
  color,
}: {
  isMobile: boolean;
  text: string;
  onClick: () => void;
  icon?: JSX.Element;
  disable?: boolean;
  disableText?: string;
  color?: {
    bg: string;
    hover: string;
  };
}) {
  return (
    <Box
      style={{
        marginBottom: 16,
        borderColor: "none",
        width: "100%",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Button
        variant="contained"
        startIcon={icon}
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 300,
          backgroundColor: color ? color.bg : "#00585e",
          height: isMobile ? 56 : 40,
          color: disable ? "#fff" : undefined,
          "&.Mui-disabled": {
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: color ? color.hover : "#007b80",
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
