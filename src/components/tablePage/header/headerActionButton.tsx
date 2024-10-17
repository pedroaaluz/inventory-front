import { Box, Button } from "@mui/material";
import { ReactElement } from "react";

export default function HeaderActionButton({
  isMobile,
  onClick,
  text,
  icon,
}: {
  isMobile: boolean;
  onClick: () => void;
  text: string;
  icon: ReactElement;
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
        onClick={onClick}
        startIcon={icon}
        style={{
          backgroundColor: "#00585e",
          height: 56,
          width: "100%",
        }}
      >
        {text}
      </Button>
    </Box>
  );
}
