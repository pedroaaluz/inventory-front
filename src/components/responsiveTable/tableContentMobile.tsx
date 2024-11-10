import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import ResponsiveDialog from "../dialog";

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
  buttonDelete?: (id: string) => void;
  tableTittle?: string;
}

export default function TableContentMobile({
  data,
  columnsShowInResponsive,
  tableTittle,
  buttonDelete,
}: ITableContentMobileProps) {
  const { mainColumn, secondaryColumn } = columnsShowInResponsive;
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");

  return (
    <>
      {buttonDelete && (
        <ResponsiveDialog
          dialogTitle={`Confirmação de operação. `}
          dialogContentText="Você está prestes a realizar uma operação de exclusão. Ao prosseguir, essa ação desfará todas as ações envolvendo essa entidade. Deseja continuar?"
          dialogActions={{ cancel: "Cancelar", confirm: "Excluir" }}
          states={{ visible, setVisible }}
          actionConfirm={() => buttonDelete(id)}
        />
      )}
      <TableContainer style={{ height: "100%" }}>
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
                  <Box position="relative">
                    {buttonDelete && (
                      <Box
                        position="absolute"
                        top={0}
                        right={0}
                        bgcolor="#910F2E"
                        borderRadius="50%"
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setId(row.id);
                            setVisible(true);
                          }}
                          style={{
                            color: "#fff",
                            padding: 6,
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                    <Box display="flex" alignItems="center" marginTop={1}>
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
                        <Typography key={index}>{`${column.name}: ${
                          row[column.objectKey] ? row[column.objectKey] : ""
                        }`}</Typography>
                      ))}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
