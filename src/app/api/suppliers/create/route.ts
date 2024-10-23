import removeNulls from "@/utils/removeNulls";
import type { Supplier } from "@/types/suppliers";
import { NextResponse } from "next/server";

async function createSupplier(
  params: Omit<
    Supplier,
    "createdAt" | "updatedAt" | "id" | "nameNormalized" | "deletedAt"
  >
) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/supplier`
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      removeNulls({
        userId: params.userId,
        name: params.name,
        image: params.image,
        cnpj: params.cnpj,
        address: params.address,
        phone: params.phone,
        email: params.email,
      })
    ),
  });

  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log({ body });

    if (!body.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    const res = await createSupplier({
      name: body.name,
      image: body.image,
      cnpj: body.cnpj,
      email: body.email,
      userId: body.userId,
      address: body.address,
      phone: body.phone,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
