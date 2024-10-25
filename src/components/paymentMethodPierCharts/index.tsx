import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { handleQueryParams } from "@/utils/handleQueryParams";
import { IPaymentMethodUsedOutput } from "@/types/metrics";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";
import { translatePaymentMethod } from "@/utils/translators";

export default function PaymentMethodPieCharts({
  startDate,
  endDate,
  userId,
}: {
  isMobile: boolean;
  startDate: string;
  endDate: string;
  userId: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["pieChartData", userId, startDate, endDate],
    queryFn: async (): Promise<IPaymentMethodUsedOutput> => {
      const params = handleQueryParams({
        startDate,
        endDate,
        userId,
      });

      const response = await fetch(`/api/metrics/paymentMethodUsed?${params}`);
      return response.json();
    },
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const pieData = Object.entries(data?.paymentMethodUsed || {}).map(
    ([key, value]) => ({
      name: translatePaymentMethod(key, "pt-br"),
      value,
    })
  );

  const pieDataSum = Object.entries(data?.paymentMethodUsed || {}).reduce(
    (acc, [_, value]) => acc + value,
    0
  );
  const isSmallScreen = useIsSmallScreen();

  return (
    <>
      <Box
        display="flex"
        border="1px solid #ddd"
        padding={2}
        height={isSmallScreen ? 400 : 350}
        maxWidth="100%"
        overflow="auto"
        flexDirection="column"
        justifyContent="center"
        alignItems={isSmallScreen ? "center" : "flex-start"}
      >
        <Stack width="100%" height="100%" spacing={1} alignItems={"center"}>
          <Typography fontSize={18} align="center">
            Métodos de pagamento utilizados no período de: {startDate} a{" "}
            {endDate}
          </Typography>
          {isLoading ? (
            <Stack spacing={5} alignItems={"center"}>
              <Skeleton variant="circular" width={160} height={160} />
              <Skeleton variant="rectangular" width={210} height={20} />
            </Stack>
          ) : pieDataSum === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography fontSize={18} align="center">
                Nenhum dado encontrado, tente alterar os filtros!
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  cx="50%"
                  cy="50%"
                  outerRadius={isSmallScreen ? 100 : 70}
                  label
                  data={pieData}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Stack>
      </Box>
    </>
  );
}
