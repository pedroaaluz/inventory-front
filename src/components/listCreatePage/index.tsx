import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactElement } from "react";
import {
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export default function ListCreatePage({
  list,
  data,
  actionsRows: { copy, remove, create },
}: {
  list: {
    title: string;
    objectKey: string;
    field: JSX.Element;
  }[];
  data: any[];
  actionsRows: {
    remove: (index: number) => void;
    copy: (index: number) => void;
    create: () => void;
  };
}) {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Box
          padding={2}
          sx={{
            border: "1px solid #ddd",
          }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {list.map(({ field, title }, index) => (
              <Box key={index}>
                <Typography
                  color="#00585e"
                  margin={1}
                  variant="body1"
                  fontWeight={300}
                >
                  {title}
                </Typography>
                {field}
              </Box>
            ))}

            <Button
              onClick={create}
              variant="contained"
              sx={{
                backgroundColor: "#00585e",
                "&:hover": {
                  backgroundColor: "#007b80",
                },
                height: isSmallScreen ? 56 : 60,
              }}
            >
              Adicionar movimentação
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          overflowY: "auto",
        }}
      >
        <Box>
          {data.map((item, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              padding={2}
              marginBottom={2}
              border={1}
              borderColor={"#ddd"}
              borderRadius={1}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color={"#00585e"} variant="body1" fontWeight={300}>
                  Movimentação {index + 1}
                </Typography>
                <Box>
                  <IconButton onClick={() => copy(index)} color="inherit">
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton onClick={() => remove(index)} color="inherit">
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box marginTop={1}>
                {list.map(({ objectKey, title }) => (
                  <Typography key={title} variant="body2">
                    {title}: {item[objectKey] as string}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
