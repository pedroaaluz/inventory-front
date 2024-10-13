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
  loadingMessage,
  handlePageChange,
  isMobile,
}: IResponsiveTableProps) {
  return (
    <Box
      padding={5}
      border={"1px solid #ddd"}
      style={{
        padding: 26,
        border: "1px solid #ddd",
      }}
    >
      {isLoading || isFetching ? (
        <TableLoadingMessage loadingMessage={loadingMessage} />
      ) : (
        <>
          {isMobile ? (
            <TableContentMobile
              data={data}
              columnsShowInResponsive={columnsShowInResponsive}
            />
          ) : (
            <TableContentDesktop data={data} columns={columns} />
          )}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" padding={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        </>
      )}
    </Box>
  );
}
