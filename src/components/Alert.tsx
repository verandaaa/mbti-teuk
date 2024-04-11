"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
