import removeNulls from "@/utils/removeNulls";
import type { Product } from "@/types/products";
import { NextResponse } from "next/server";

async function createProduct(
  params: Omit<Product, "createdAt" | "updatedAt" | "id">
) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/product`
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
        stockQuantity: params.stockQuantity,
        description: params.description,
        image: params.image,
        minimumIdealStock: params.minimumIdealStock,
        positionInStock: params.positionInStock,
        productionCost: params.productionCost,
        unitPrice: params.unitPrice,
        suppliersIds: params.suppliersIds,
        categoriesIds: params.categoriesIds,
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

    const res = await createProduct({
      name: body.name,
      description: body.description,
      stockQuantity: body.stockQuantity,
      unitPrice: body.unitPrice,
      suppliersIds: body.suppliersIds,
      userId: body.userId,
      categoriesIds: body.categoriesIds,
      image: body.image,
      positionInStock: body.positionInStock,
      minimumIdealStock: body.minimumIdealStock,
      productionCost: body.productionCost,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
