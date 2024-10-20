import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function SelectInput({
  isMobile,
  value,
  setValue,
  label,
  options,
}: {
  isMobile: boolean;
  value: {
    id: string;
    name: string;
  }[];
  setValue: (value: { id: string; name: string }[]) => void;
  label: string;
  options: {
    id: string;
    name: string;
  }[];
}) {
  const handleSelectChange = (event: any) => {
    const selectedIds = event.target.value;
    const selectedItems = options.filter((option) =>
      selectedIds.includes(option.id)
    );
    setValue(selectedItems);
  };

  const selectedIds = value.map((item) => item.id);

  return (
    <FormControl
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
        width: isMobile ? "100%" : 300,
      }}
    >
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        value={selectedIds}
        label={label}
        onChange={handleSelectChange}
        displayEmpty
        multiple
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((id: string) => {
              const item = options.find((option) => option.id === id);
              return item ? <Chip key={item.id} label={item.name} /> : null;
            })}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
