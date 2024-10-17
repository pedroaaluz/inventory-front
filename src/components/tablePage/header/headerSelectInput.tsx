import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function HeaderSelectInput({
  isMobile,
  value,
  setValue,
  label,
  options,
  index,
}: {
  isMobile: boolean;
  value: string;
  setValue: (event: any) => void;
  label: string;
  options: string[];
  index: number;
}) {
  return (
    <FormControl
      key={index}
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
