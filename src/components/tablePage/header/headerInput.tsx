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
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  type: "text" | "date";
  label: string;
}) {
  return (
    <TextField
      label={label}
      value={value}
      type={type}
      style={{
        width: isMobile ? "100%" : "300px",
      }}
      sx={{
        "& .MuiInputLabel-root": {
          color: "#4E4D48",
          "&.Mui-focused": {
            color: "#4E4D48",
          },
        },
        "& .MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4E4D48",
            borderWidth: "2px",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4E4D48",
              borderWidth: "3px",
            },
          },
        },
      }}
      onChange={(e) => setValue(e.target.value)}
      focused
    />
  );
}
