"use client";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <h1>produto de id: {params.id}</h1>
    </div>
  );
}
