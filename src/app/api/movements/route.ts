import removeNulls from "@/utils/removeNulls";
import type {
  TListMovementParams,
  EnumMovementsType,
  EnumPaymentMethodType,
} from "@/types/movements";
import { getQueryParams } from "@/utils/getQueryParams";
import { NextResponse } from "next/server";

async function fetchListProductData(params: TListMovementParams) {
  const paramsParsed = new URLSearchParams(
    removeNulls({
      userId: params.userId,
      startDate: params.startDate,
      endDate: params.endDate,
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy,
      productName: params.productName,
      movementType: params.movementType,
      paymentMethod: params.paymentMethod,
    })
  );

  if (params.productsIds) {
    params.productsIds.map((productId) =>
      paramsParsed.append("productsIds", productId)
    );
  }

  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/movement/${params.userId}`
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
      [
        "userId",
        "startDate",
        "endDate",
        "page",
        "pageSize",
        "orderBy",
        "movementType",
        "paymentMethod",
        "productsIds",
        "productName",
      ],
      request.url
    );

    if (!params.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await fetchListProductData({
      userId: params.userId,
      startDate: params.startDate,
      endDate: params.endDate,
      page: params.page,
      pageSize: params.pageSize,
      orderBy: params.orderBy as "asc" | "desc",
      productsIds: [params.productsIds],
      movementType: params.movementType as EnumMovementsType,
      paymentMethod: params.paymentMethod as EnumPaymentMethodType,

      productName: params.productName,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
