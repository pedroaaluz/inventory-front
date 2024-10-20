import removeNulls from "@/utils/removeNulls";
import type { Product } from "@/types/products";
import { NextResponse } from "next/server";
import { convertImageToBase64 } from "@/utils/convertImageToBase64";

async function updateProduct(params: Product) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/product/${params.id}`
  );

  console.log(params);

  const response = await fetch(url, {
    method: "PUT",
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
  console.log(response);
  return response.json();
}

// Adiciona a função PUT para manipular a requisição e conversão de imagem
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log({ body });

    if (!body.userId) {
      return NextResponse.json({ message: "userId is required", status: 400 });
    }

    if (!body.id) {
      return NextResponse.json({ message: "id is required", status: 400 });
    }

    const res = await updateProduct({
      id: body.id,
      userId: body.userId,
      name: body.name,
      stockQuantity: body.stockQuantity,
      description: body.description,
      image: body.image && (await convertImageToBase64(body.image)),
      minimumIdealStock: body.minimumIdealStock,
      positionInStock: body.positionInStock,
      productionCost: body.productionCost,
      unitPrice: body.unitPrice,
      suppliersIds: body.suppliersIds,
      categoriesIds: body.categoriesIds,
    });

    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ message: "internal server error", status: 500 });
  }
}
