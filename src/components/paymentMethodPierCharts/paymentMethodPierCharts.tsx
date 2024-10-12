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
import { Skeleton, Stack, Typography } from "@mui/material";

export default function PaymentMethodPieCharts({
  isMobile,
  startDate,
  endDate,
  userId,
}: {
  isMobile: boolean;
  startDate: string;
  endDate: string;
  userId: string;
}) {
  const { data, isLoading, isError } = useQuery({
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

  const translatePaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "creditCard":
        return "Cartão de Crédito";
      case "debitCard":
        return "Cartão de Débito";
      case "cash":
        return "Dinheiro";
      case "pix":
        return "Pix";
      default:
        return paymentMethod;
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const pieData = Object.entries(data?.paymentMethodUsed || {}).map(
    ([key, value]) => ({
      name: translatePaymentMethod(key),
      value,
    })
  );

  const pieDataSum = Object.entries(data?.paymentMethodUsed || {}).reduce(
    (acc, [_, value]) => acc + value,
    0
  );

  return (
    <>
      <Stack width="100%" height="100%" spacing={1} alignItems={"center"}>
        <Typography variant="h6" align="center">
          Métodos de pagamento utilizados no período de:
        </Typography>
        <Typography variant="h5" align="center">
          {startDate} a {endDate}
        </Typography>
        {isLoading ? (
          <Stack spacing={5} alignItems={"center"}>
            <Skeleton variant="circular" width={220} height={220} />
            <Skeleton variant="rectangular" width={210} height={20} />
          </Stack>
        ) : pieDataSum === 0 ? (
          <div>Nenhum dado encontrado, tente alterar os filtros!</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 100 : 100}
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
    </>
  );
}
