import { Box, Button, SelectChangeEvent } from "@mui/material";
import HeaderInput from "./headerInput";
import { Search } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import HeaderSelectInput from "./headerSelectInput";

export default function HeaderSearchBar({
  inputs,
  handleSubmit,
  isMobile,
}: {
  inputs: (
    | {
        value: string;
        setValue: Dispatch<SetStateAction<string>>;
        label: string;
        type: "text" | "date";
      }
    | {
        value: string;
        setValue: (event: SelectChangeEvent) => void;
        label: string;
        type: "select";
        options: string[];
      }
  )[];
  isMobile: boolean;
  handleSubmit: () => void;
}) {
  return (
    <Box style={{ padding: 16, marginBottom: 16, borderColor: "none" }}>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
        alignItems="center"
      >
        {inputs.map((input, index) => {
          if (input.type === "select") {
            return (
              <HeaderSelectInput
                key={index}
                isMobile={isMobile}
                value={input.value}
                setValue={input.setValue}
                label={input.label}
                options={input.options}
                index={index}
              />
            );
          }

          return (
            <HeaderInput
              key={index}
              text={input.label}
              isMobile={isMobile}
              value={input.value}
              setValue={input.setValue}
              type={input.type}
              label={input.label}
            />
          );
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<Search />}
          style={{
            backgroundColor: "#00585e",
            height: 56,
            width: isMobile ? "100%" : "300px",
          }}
        >
          Pesquisar
        </Button>
      </Box>
    </Box>
  );
}
