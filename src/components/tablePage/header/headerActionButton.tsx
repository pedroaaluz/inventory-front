import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { Box, Button } from "@mui/material";
import { ReactElement } from "react";

export default function HeaderActionButton({
  onClick,
  text,
  icon,
}: {
  isMobile: boolean;
  onClick: () => void;
  text: string;
  icon: ReactElement;
}) {
  const isMobile = useIsSmallScreen();

  return (
    <Box
      gap={2}
      style={{
        padding: 16,
        marginBottom: 16,
        ...(!isMobile && { width: "100%" }),
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
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
          minWidth: isMobile ? 400 : 150,
        }}
      >
        {text}
      </Button>
    </Box>
  );
}
