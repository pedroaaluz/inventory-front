import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Avatar,
  Typography,
} from "@mui/material";

interface ITableContentMobileProps {
  data: { [key: string]: any; rowAction?: (params?: unknown) => void }[];
  columnsShowInResponsive: {
    mainColumn: {
      name: string;
      objectKey: string;
      hasImage?: boolean;
    };
    secondaryColumn: {
      name: string;
      objectKey: string;
      hasImage?: boolean;
    }[];
  };
  tableTittle?: string;
}

export default function TableContentMobile({
  data,
  columnsShowInResponsive,
  tableTittle,
}: ITableContentMobileProps) {
  const { mainColumn, secondaryColumn } = columnsShowInResponsive;

  return (
    <TableContainer>
      {tableTittle && (
        <Typography variant="h6" align="center">
          {tableTittle}
        </Typography>
      )}
      <Table stickyHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow hover onClick={row.rowAction} key={rowIndex}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  {mainColumn.hasImage && (
                    <Avatar
                      alt={row[mainColumn.objectKey]}
                      src={row["image"]}
                      style={{ marginRight: 8 }}
                    />
                  )}
                  <Typography>{row[mainColumn.objectKey]}</Typography>
                </Box>
                <Box marginTop={2}>
                  {secondaryColumn.map((column, index) => (
                    <>
                      <Typography key={index}>{`${column.name}: ${
                        row[column.objectKey] ? row[column.objectKey] : ""
                      }`}</Typography>
                    </>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
