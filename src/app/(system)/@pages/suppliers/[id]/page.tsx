"use client";
import { useParams } from "next/navigation";

export default function SupplierPage() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <h1>fornecedor de id: {params.id}</h1>
    </div>
  );
}
