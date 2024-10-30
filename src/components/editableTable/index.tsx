import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import {
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export default function EditableTable({
  columns,
  data,
  actionsRows: { copy, remove, create },
}: {
  columns: {
    title: string;
    objectKey: string;
    field: ReactElement;
  }[];
  data: any[];
  actionsRows: {
    remove: (index: number) => void;
    copy: (index: number) => void;
    create: () => void;
  };
}) {
  return (
    <Box
      padding={5}
      style={{
        border: "1px solid #ddd",
        height: 500,
        display: "flex",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography variant="body2" fontWeight={300}>
                    {column.title}
                  </Typography>
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.field}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={create}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column.objectKey]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => copy(rowIndex)}>
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton onClick={() => remove(rowIndex)}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
