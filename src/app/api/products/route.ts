import removeNulls from "@/utils/removeNulls";
import type { TListProductsParams } from "@/types/products";
import { getQueryParams } from "@/utils/getQueryParams";
import { NextResponse } from "next/server";

async function fetchListProductData(params: TListProductsParams) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      userId: params.userId,
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      suppliersIds: params.suppliersIds,
    })
  );

  const url = new URL(
    "https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/product"
  );

  url.search = paramsParsed.toString();

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return response.json();
}

export async function GET(request: Request) {
  try {
    const params = getQueryParams(
      [
        "userId",
        "name",
        "startDate",
        "endDate",
        "page",
        "pageSize",
        "orderBy",
        "suppliersIds",
      ],
      request.url
    );

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }
    const queryParams: TListProductsParams = {
      userId: params.userId,
      name: params.name,
      startDate: params.startDate,
      endDate: params.endDate,
      page: params.page,
      pageSize: params.pageSize,
    };

    if (params.suppliersIds) {
      queryParams.suppliersIds = Array.isArray(params.suppliersIds)
        ? params.suppliersIds
        : [params.suppliersIds];
    }

    const res = await fetchListProductData(queryParams);

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
