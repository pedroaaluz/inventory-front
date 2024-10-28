import { getQueryParams } from "@/utils/getQueryParams";
import removeNulls from "@/utils/removeNulls";
import { NextResponse } from "next/server";

async function fetchStockMetrics(params: {
  userId: string;
  name?: string;
  page?: string;
  pageSize?: string;
}) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      productName: params.name,
      page: params.page,
      pageSize: params.pageSize,
    })
  );

  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/metrics/${params.userId}/stock-metrics?${paramsParsed}`
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function GET(request: Request) {
  try {
    const params = getQueryParams(
      ["userId", "page", "pageSize", "name"],
      request.url
    );

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await fetchStockMetrics({
      userId: params.userId,
      name: params.name,
      page: params.page,
      pageSize: params.pageSize,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
