import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function HeaderInput({
  value,
  setValue,
  type,
  label,
}: {
  text: string;
  isMobile: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: "text" | "date";
  label: string;
}) {
  const isMobile = useIsSmallScreen();

  return (
    <TextField
      label={label}
      value={value}
      type={type}
      style={{
        maxWidth: 300,
        minWidth: isMobile ? 400 : 150,
        ...(isMobile && { width: 400 }),
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
      onChange={(e) => setValue(e.target.value)}
      focused
    />
  );
}
