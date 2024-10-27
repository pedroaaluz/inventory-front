"use client";

import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { useUser } from "@clerk/nextjs";

export default function TotalStockCostDisplay() {
  const { user, isLoaded } = useUser();

  const userId = user?.id;

  const { data, isLoading } = useQuery<{
    message: string;
    totalStockCost: number;
  }>({
    queryKey: ["totalStockCost", isLoaded],
    queryFn: async (): Promise<{
      message: string;
      totalStockCost: number;
    }> => {
      const params = handleQueryParams({ userId });
      const response = await fetch(`/api/metrics/totalStockCost?${params}`);

      return response.json();
    },
  });

  const isSmallScreen = useIsSmallScreen();

  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={isSmallScreen ? 200 : 300}
        />
      ) : (
        <Box
          display="flex"
          border="1px solid #ddd"
          padding={2}
          height={isSmallScreen ? 400 : 300}
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h6" align="center">
            Valor total em estoque:
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography variant={isSmallScreen ? "h5" : "h4"} align="center">
              {data?.totalStockCost
                ? data?.totalStockCost.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ 0,00"}
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              height={100}
              data={[
                {
                  name: "Page A",
                  uv: 4000,
                  pv: 2400,
                  amt: 2400,
                },
                {
                  name: "Page B",
                  uv: 3000,
                  pv: 1398,
                  amt: 2210,
                },
                {
                  name: "Page C",
                  uv: 2000,
                  pv: 9800,
                  amt: 2290,
                },
                {
                  name: "Page D",
                  uv: 2780,
                  pv: 3908,
                  amt: 2000,
                },
                {
                  name: "Page E",
                  uv: 1890,
                  pv: 4800,
                  amt: 2181,
                },
                {
                  name: "Page F",
                  uv: 2390,
                  pv: 3800,
                  amt: 2500,
                },
                {
                  name: "Page G",
                  uv: 3490,
                  pv: 4300,
                  amt: 2100,
                },
              ]}
            >
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#008A91"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  );
}
