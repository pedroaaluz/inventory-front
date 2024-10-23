import { NextResponse } from "next/server";

async function fetchGetSupplierData(supplierId: string) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/supplier/${supplierId}`
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return response.json();
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing supplier" },
        { status: 400 }
      );
    }

    const supplierId = id;

    const response = await fetchGetSupplierData(supplierId);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
