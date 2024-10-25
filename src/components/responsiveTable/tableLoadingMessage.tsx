import { Box, Skeleton } from "@mui/material";

export default function TableLoadingMessage({ height }: { height: number }) {
  return (
    <Box style={{ height }}>
      <Box width="100%">
        {Array.from({ length: 8 }).map((_, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            padding="8px 16px"
            borderBottom="1px solid #e0e0e0"
          >
            <Box width="20%">
              <Skeleton variant="text" width="100%" />
            </Box>
            <Box width="20%">
              <Skeleton variant="text" width="100%" />
            </Box>
            <Box width="20%">
              <Skeleton variant="text" width="100%" />
            </Box>
            <Box width="20%">
              <Skeleton variant="text" width="100%" />
            </Box>
            <Box width="20%">
              <Skeleton variant="text" width="100%" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
