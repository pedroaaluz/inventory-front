import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
} from "@mui/material";
import SelectInput from "./selectInput";
import { InputField } from "@/types/putPage";

export default function InputList({
  listItems,
  isMobile,
}: {
  listItems: InputField[];
  isMobile: boolean;
}) {
  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {listItems.map((item, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00585e",
                  borderRadius: "50%",
                  padding: "8px",
                }}
              >
                {item.icon}
              </Box>
            </Avatar>
          </ListItemAvatar>
          {item.type === "select" ? (
            <SelectInput
              isMobile={isMobile}
              value={item.value}
              setValue={item.onChangeValue}
              label={item.label}
              options={item.options}
            />
          ) : (
            <TextField
              label={item.label}
              value={item.value}
              onChange={(e) => {
                const isNumber =
                  item.type === "number" || item.type === "number-integer";
                const inputValue = e.target.value;

                if (isNumber) {
                  if (inputValue === "") {
                    item.onChangeValue(0);
                    return;
                  }

                  const value = parseFloat(inputValue.replace(",", "."));

                  if (value < 0) {
                    return;
                  }

                  item.onChangeValue(
                    item.type === "number-integer"
                      ? Math.floor(value)
                      : Number(value.toFixed(2))
                  );

                  return;
                }

                item.onChangeValue(inputValue);
              }}
              fullWidth
              variant="outlined"
              margin="normal"
              type={item.type === "text" ? "text" : "number"}
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
                width: isMobile ? "100%" : 300,
              }}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
}
