import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function HeaderInput({
  isMobile,
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
  return (
    <TextField
      label={label}
      value={value}
      type={type}
      style={{
        width: "100%",
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
