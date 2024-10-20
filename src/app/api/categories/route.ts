import { NextResponse } from "next/server";

async function fetchListCategoriesData() {
  const url = new URL(
    "https://3q16zqqmj8.execute-api.sa-east-1.amazonaws.com/production/category"
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function GET() {
  try {
    const res = await fetchListCategoriesData();
    return NextResponse.json({ ...res, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server erro", status: 500 });
  }
}
