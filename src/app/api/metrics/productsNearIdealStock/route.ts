import { getQueryParams } from "@/utils/getQueryParams";
import { NextResponse } from "next/server";

async function fetchTProductNearIdealStock(params: { userId: string }) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/metrics/${params.userId}/products-near-ideal-stock`
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
    const params = getQueryParams(["userId"], request.url);

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await fetchTProductNearIdealStock({
      userId: params.userId,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
