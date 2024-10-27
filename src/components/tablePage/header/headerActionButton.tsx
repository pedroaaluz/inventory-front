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
      display="flex"
      gap={2}
      style={{
        padding: 16,
        marginBottom: 16,
        borderColor: "none",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
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
          maxWidth: 300,
          minWidth: isMobile ? 400 : 150,
          ...(isMobile && { width: 400 }),
        }}
      >
        {text}
      </Button>
    </Box>
  );
}
