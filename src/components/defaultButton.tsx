import { Box, Button } from "@mui/material";

export default function DefaultButton({
  isMobile,
  text,
  onClick,
  icon,
}: {
  isMobile: boolean;
  text: string;
  onClick: () => void;
  icon?: JSX.Element;
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
        color="primary"
        startIcon={icon}
        style={{
          backgroundColor: "#00585e",
          height: isMobile ? 56 : 40,
          width: isMobile ? "100%" : "80%",
        }}
        onClick={onClick}
      >
        {text}
      </Button>
    </Box>
  );
}
