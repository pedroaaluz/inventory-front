import removeNulls from "@/utils/removeNulls";
import type { ICreateMovementInput } from "@/types/movements";
import { getQueryParams } from "@/utils/getQueryParams";
import { NextResponse } from "next/server";

async function fetchCreateMovements(params: ICreateMovementInput) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/movement/${params.userId}`
  );

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await fetchCreateMovements({
      userId: body.userId,
      movements: body.movements,
    });

    console.log(res);

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
