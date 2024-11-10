import { Grid, Pagination, Box } from "@mui/material";
import TableLoadingMessage from "./tableLoadingMessage";
import TableContentDesktop from "./tableContentDesktop";
import TableContentMobile from "./tableContentMobile";
import { IResponsiveTableProps } from "@/types/tableResponsive";

export default function ResponsiveTable({
  isLoading,
  isFetching,
  data,
  columns,
  columnsShowInResponsive,
  page,
  totalPages,
  handlePageChange,
  isMobile,
  tableTittle,
  height = 600,
  buttonDelete,
}: IResponsiveTableProps) {
  return (
    <Box
      padding={5}
      style={{
        border: "1px solid #ddd",
        display: "flex",
        height,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {isLoading || isFetching ? (
        <TableLoadingMessage height={height} />
      ) : (
        <>
          {isMobile ? (
            <TableContentMobile
              data={data}
              columnsShowInResponsive={columnsShowInResponsive}
              tableTittle={tableTittle}
              buttonDelete={buttonDelete}
            />
          ) : (
            <TableContentDesktop
              data={data}
              columns={columns}
              tableTittle={tableTittle}
              height={height}
              buttonDelete={buttonDelete}
            />
          )}
          {page && (
            <Box display="flex" justifyContent="center" padding={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                siblingCount={isMobile ? 0 : 1}
                boundaryCount={isMobile ? 1 : 2}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
