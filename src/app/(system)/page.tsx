"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const redirect = () => router.push("/products");

  redirect();
  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      Dashboard
    </button>
  );
}
