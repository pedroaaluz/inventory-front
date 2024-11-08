import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  Typography,
  Tooltip,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
interface ITableContentProps {
  data: { [key: string]: any; rowAction?: (params?: unknown) => void }[];
  columns: {
    name: string;
    objectKey: string;
    hasImage?: boolean;
    description?: string;
  }[];
  height: number;
  tableTittle?: string;
}

export default function TableContentDesktop({
  data,
  columns,
  height,
  tableTittle,
}: ITableContentProps) {
  return (
    <TableContainer style={{ height }}>
      {tableTittle && (
        <Typography color={"#00585e"} variant="h6" align="center">
          {tableTittle}
        </Typography>
      )}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name}>
                <Box display="flex" alignItems="center">
                  <Typography fontWeight={800} fontSize={14}>
                    {column.name}
                  </Typography>
                  {column.description && (
                    <Tooltip title={column.description}>
                      <InfoIcon sx={{ height: 20, color: "#00585e" }} />
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow hover onClick={row.rowAction} key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.objectKey}>
                  {column.hasImage ? (
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={row[column.objectKey]}
                        src={row["image"]}
                        style={{ marginRight: 8 }}
                      />
                      <Typography fontSize={14}>
                        {row[column.objectKey]}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography fontSize={14}>
                        {row[column.objectKey]}
                      </Typography>
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
