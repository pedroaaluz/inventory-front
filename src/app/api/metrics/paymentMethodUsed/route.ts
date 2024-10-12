import removeNulls from "@/utils/removeNulls";
import type { IPaymentMethodUsedParams } from "@/types/metrics";
import { getQueryParams } from "@/utils/getQueryParams";
import { NextResponse } from "next/server";

async function fetchPaymentMethodUsed(params: IPaymentMethodUsedParams) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      startDate: params.startDate,
      endDate: params.endDate,
    })
  );

  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/metrics/${params.userId}/payment-method-used?${paramsParsed}`
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
      ["userId", "startDate", "endDate"],
      request.url
    );

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    console.log("paymentMethod", { params });
    const res = await fetchPaymentMethodUsed({
      userId: params.userId,
      startDate: params.startDate,
      endDate: params.endDate,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
