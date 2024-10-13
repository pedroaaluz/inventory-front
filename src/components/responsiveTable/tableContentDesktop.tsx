import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
} from "@mui/material";

interface ITableContentProps {
  data: { [key: string]: any }[];
  columns: { name: string; objectKey: string; hasImage?: boolean }[];
}

export default function TableContentDesktop({
  data,
  columns,
}: ITableContentProps) {
  return (
    <TableContainer style={{ height: 900 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name}>{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.objectKey}>
                  {column.hasImage ? (
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={row[column.objectKey]}
                        src={row["image"]}
                        style={{ marginRight: 8 }}
                      />
                      {row[column.objectKey]}
                    </Box>
                  ) : (
                    <> {row[column.objectKey]}</>
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
