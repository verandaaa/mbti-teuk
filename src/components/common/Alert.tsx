"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Alert() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = `${searchParams.get("message")}`;
    alert(message);
    router.push("/list");
  }, []);

  return null;
}
