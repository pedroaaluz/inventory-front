import { NextResponse } from "next/server";

async function deleteSupplier(supplierId: string) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/supplier/${supplierId}`
  );

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Missing productId" },
        { status: 400 }
      );
    }

    const supplierId = id;

    const response = await deleteSupplier(supplierId);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
