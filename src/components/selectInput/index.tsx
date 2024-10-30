import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function SelectInput({
  items,
  value,
  onChange,
}: {
  items: { label: string; value: string }[];
  value: string;
  onChange: (e: any) => void;
}) {
  const isSmallScreen = useIsSmallScreen();

  const styles = {
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
          borderWidth: "2px",
        },
      },
    },
    width: isSmallScreen ? "100%" : 300,
  };
  return (
    <FormControl sx={styles}>
      <Select value={value} onChange={onChange}>
        {items.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
