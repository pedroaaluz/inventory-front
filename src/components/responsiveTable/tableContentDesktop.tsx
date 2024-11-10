"use client";

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
  Button,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import ResponsiveDialog from "../dialog";
import { useState } from "react";
import { Add, Delete as DeleteIcon } from "@mui/icons-material";

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
  buttonDelete?: (id: string) => void;
}

export default function TableContentDesktop({
  data,
  columns,
  height,
  tableTittle,
  buttonDelete,
}: ITableContentProps) {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");

  return (
    <>
      {buttonDelete && (
        <ResponsiveDialog
          dialogTitle={`Confirmação de operação.`}
          dialogContentText="Você está prestes a realizar uma operação de exclusão. Ao prosseguir, essa ação desfará todas as ações envolvendo essa entidade. Deseja continuar?"
          dialogActions={{ cancel: "Cancelar", confirm: "Excluir" }}
          states={{ visible, setVisible }}
          actionConfirm={() => buttonDelete(id)}
        />
      )}
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
              {buttonDelete && <TableCell></TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow hover onClick={row.rowAction} key={rowIndex}>
                {columns.map((column) => {
                  return (
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
                  );
                })}
                {buttonDelete && (
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#910F2E",
                        height: 36,
                        "&.Mui-disabled": {
                          color: "#fff",
                        },
                        "&:hover": {
                          backgroundColor: "#8C3F52",
                        },
                      }}
                      onClick={() => {
                        setVisible(true);
                        setId(row.id);
                      }}
                      startIcon={<DeleteIcon />}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
