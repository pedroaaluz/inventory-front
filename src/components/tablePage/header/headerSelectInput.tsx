import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function HeaderSelectInput({
  value,
  setValue,
  label,
  options,
  index,
}: {
  value: string;
  setValue: (event: any) => void;
  label: string;
  options: string[];
  index: number;
}) {
  const isMobile = useIsSmallScreen();

  return (
    <FormControl
      key={index}
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
            borderWidth: "2px",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00585e",
              borderWidth: "3px",
            },
          },
        },
      }}
    >
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        value={value}
        label={label}
        onChange={setValue}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
