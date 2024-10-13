import { TextField } from "@mui/material";

export default function HeaderInput({
  isMobile,
  value,
  setValue,
  type,
}: {
  text: string;
  isMobile: boolean;
  value: string;
  setValue: (value: string) => void;
  type: "text" | "date";
}) {
  return (
    <TextField
      label="Filtrar por Nome"
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
    />
  );
}
