import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function HeaderInput({
  value,
  setValue,
  type,
  label,
  minValue,
}: {
  text: string;
  isMobile: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: "text" | "date";
  label: string;
  minValue?: string;
}) {
  const isMobile = useIsSmallScreen();

  return (
    <TextField
      label={label}
      value={value}
      type={type}
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
      inputProps={type === "date" ? { min: minValue } : {}}
      onChange={(e) => setValue(e.target.value)}
      focused
    />
  );
}
