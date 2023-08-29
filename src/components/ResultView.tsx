"use client";

import { useSearchParams } from "next/navigation";
import { Result } from "@/model/result";

type Props = {
  result: Result | undefined;
};

export default function ResultView({ result }: Props) {
  return <>{result && <p>{result.message}</p>}</>;
}
