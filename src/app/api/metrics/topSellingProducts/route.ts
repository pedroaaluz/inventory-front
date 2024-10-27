import { getQueryParams } from "@/utils/getQueryParams";
import removeNulls from "@/utils/removeNulls";
import { NextResponse } from "next/server";

async function fetchTopSellingProducts(params: {
  userId: string;
  page?: string;
  pageSize?: string;
  startDate?: string;
  endDate?: string;
}) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      userId: params.userId,
      page: params.page,
      pageSize: params.pageSize,
      startDate: params.startDate,
      endDate: params.endDate,
    })
  );

  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/metrics/${params.userId}/top-selling-products?${paramsParsed}`
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
      ["userId", "page", "pageSize", "startDate", "endDate"],
      request.url
    );

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await fetchTopSellingProducts({
      userId: params.userId,
      page: params.page,
      pageSize: params.pageSize,
      startDate: params.startDate,
      endDate: params.endDate,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
