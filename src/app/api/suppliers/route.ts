import removeNulls from "@/utils/removeNulls";
import type { TListSuppliersParams } from "@/types/suppliers";
import { getQueryParams } from "@/utils/getQueryParams";
import { NextResponse } from "next/server";

async function fetchListSuppliersData(params: TListSuppliersParams) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      userId: params.userId,
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
    })
  );

  const url = new URL(
    "https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/supplier"
  );

  url.search = paramsParsed.toString();

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
      ["userId", "name", "startDate", "endDate", "page", "pageSize", "orderBy"],
      request.url
    );

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await fetchListSuppliersData({
      userId: params.userId,
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
      page: params.page,
      pageSize: params.pageSize,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
