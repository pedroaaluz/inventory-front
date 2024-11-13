import {
  Autocomplete,
  Box,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import HeaderInput from "./headerInput";
import { Search } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import HeaderSelectInput from "./headerSelectInput";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import HeaderDateRange from "./headerDateRange";

export default function HeaderSearchBar({
  inputs,
  handleSubmit,
}: {
  inputs: (
    | {
        value: string;
        setValue: Dispatch<SetStateAction<string>>;
        label: string;
        type: "text" | "date";
        minValue?: string;
      }
    | {
        text: string;
        isMobile: boolean;
        startDate: string;
        setStartDate: Dispatch<SetStateAction<string>>;
        endDate: string;
        setEndDate: Dispatch<SetStateAction<string>>;
        label: string;
        minValue?: string;
        type: "dateRange";
      }
    | {
        value: string;
        setValue: (event: SelectChangeEvent) => void;
        label: string;
        type: "select";
        options: string[];
      }
    | {
        value: string;
        setValue: Dispatch<SetStateAction<string>>;
        label: string;
        type: "autocomplete";
        options: any[];
        getOptionLabel: (option: any) => string;
        onInputChange?: (event: any, newInputValue: string) => void;
        onChange?: (event: any, newValue: any) => void;
        loading?: boolean;
      }
  )[];
  isMobile: boolean;
  handleSubmit: () => void;
}) {
  const isMobile = useIsSmallScreen();

  return (
    <Box
      style={{
        padding: 16,
        marginBottom: 16,
        borderColor: "none",
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
        maxWidth={"100%"}
        justifyContent={isMobile ? "center" : "flex-start"}
        alignItems={isMobile ? "center" : "flex-start"}
        justifyItems={isMobile ? "center" : "flex-start"}
      >
        {inputs.map((input, index) => {
          if (input.type === "select") {
            return (
              <HeaderSelectInput
                key={index}
                value={input.value}
                setValue={input.setValue}
                label={input.label}
                options={input.options}
                index={index}
              />
            );
          }

          if (input.type === "autocomplete") {
            return (
              <Autocomplete
                key={index}
                loadingText="Procurando..."
                noOptionsText="Nada encontrado"
                options={input.options}
                getOptionLabel={input.getOptionLabel}
                onInputChange={input.onInputChange}
                onChange={input.onChange}
                loading={input.loading}
                style={{
                  width: isMobile ? "100%" : "300px",
                  maxWidth: isMobile ? "100%" : 200,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={input.label}
                    variant="outlined"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#00585e",
                        "&.Mui-focused": { color: "#00585e" },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00585e",
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00585e",
                            borderWidth: 2,
                          },
                        },
                      },
                    }}
                  />
                )}
              />
            );
          }

          if (input.type === "dateRange") {
            return (
              <HeaderDateRange
                endDate={input.endDate}
                setEndDate={input.setEndDate}
                startDate={input.startDate}
                isMobile={isMobile}
                setStartDate={input.setStartDate}
                label={input.label}
                minValue={input.minValue}
                key={index}
                text={input.label}
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
              minValue={input.minValue}
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
            maxWidth: isMobile ? "100%" : 300,
          }}
        >
          Pesquisar
        </Button>
      </Box>
    </Box>
  );
}
