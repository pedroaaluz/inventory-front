"use client";
import { useParams } from "next/navigation";

export default function MovementPage() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <h1>movimentação de id: {params.id}</h1>
    </div>
  );
}
