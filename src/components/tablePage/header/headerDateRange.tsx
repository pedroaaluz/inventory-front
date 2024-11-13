import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { TextField, Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function HeaderInput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  label,
  minValue,
}: {
  text: string;
  isMobile: boolean;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  label: string;
  minValue?: string;
}) {
  const isMobile = useIsSmallScreen();

  return (
    <Box
      width={isMobile ? "100%" : undefined}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label={`${label} de Início`}
        value={startDate}
        type="date"
        style={{
          width: isMobile ? "100%" : "300px",
          maxWidth: isMobile ? "100%" : 200,
        }}
        sx={{
          "& .MuiInputLabel-root": {
            color: "#00585e",
            "&.Mui-focused": {
              color: "#00585e",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00585e",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00585e",
              },
            },
          },
        }}
        inputProps={{ min: minValue }}
        onChange={(e) => setStartDate(e.target.value)}
        focused
      />
      <TextField
        label={`${label} Final`}
        value={endDate}
        type="date"
        style={{
          width: isMobile ? "100%" : "300px",
          maxWidth: isMobile ? "100%" : 200,
        }}
        sx={{
          "& .MuiInputLabel-root": {
            color: "#00585e",
            "&.Mui-focused": {
              color: "#00585e",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00585e",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00585e",
              },
            },
          },
        }}
        inputProps={{ min: startDate }}
        onChange={(e) => setEndDate(e.target.value)}
        focused
      />
    </Box>
  );
}
