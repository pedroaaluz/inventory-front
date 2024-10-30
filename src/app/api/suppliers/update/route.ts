import removeNulls from "@/utils/removeNulls";
import type { Supplier } from "@/types/suppliers";
import { NextResponse } from "next/server";

async function updateSupplier(
  params: Omit<Supplier, "createdAt" | "updatedAt" | "nameNormalized">
) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/supplier/${params.id}`
  );

  const response = await fetch(url, {
    method: "PUT",
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    if (!body.id) {
      return NextResponse.json({ message: "id is required", status: 400 });
    }

    const res = await updateSupplier({
      id: body.id,
      userId: body.userId,
      name: body.name,
      image: body.image,
      cnpj: body.cnpj,
      address: body.address,
      phone: body.phone,
      email: body.email,
      deletedAt: body.deletedAt || null,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
