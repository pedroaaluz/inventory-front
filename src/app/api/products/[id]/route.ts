import { NextResponse } from "next/server";

async function fetchGetProductData(productId: string) {
  const url = new URL(
    `https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/product/${productId}`
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing productId" },
        { status: 400 }
      );
    }

    const productId = id;

    const response = await fetchGetProductData(productId);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
