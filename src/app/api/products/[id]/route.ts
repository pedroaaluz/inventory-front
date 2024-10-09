import removeNulls from "@/utils/removeNulls";
import type { TListProductsParams } from "@/types/products";

async function fetchListProductData(params: TListProductsParams) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      userId: params.userId,
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

export async function GET() {
  try {
    const res = await fetchListProductData({
      userId: "b6ac2f1c-99fe-4e1f-b2ee-1ff60cd1cfd2",
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
