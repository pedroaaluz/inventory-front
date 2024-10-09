import removeNulls from "@/utils/removeNulls";
import type { TListProductsParams } from "@/types/products";
import { getQueryParams } from "@/utils/getQueryParams";

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
  });

  return response.json();
}

export async function GET(request: Request) {
  console.log({ request });

  const params = getQueryParams(
    ["userId", "name", "startDate", "endDate", "page", "pageSize", "orderBy"],
    request.url
  );

  if (!params.userId) {
    return new Response("userId is required", { status: 400 });
  }

  console.log({ params });

  const res = await fetchListProductData({
    userId: params.userId,
    name: params.name,
    startDate: "2010-04-19 03:00:00.000",
    endDate: params.endDate,
    page: params.page,
    pageSize: params.pageSize,
  });

  try {
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
