"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function Message() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = `${searchParams.get("message")}`;
    alert(message);
    router.push("/list");
  }, []);

  return <></>;
}

export default function Alert() {
  <Suspense>
    <Message />
  </Suspense>;

  return <></>;
}
