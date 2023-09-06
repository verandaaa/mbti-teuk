"use client";

import { useSearchParams } from "next/navigation";
import { Result } from "@/model/result";

type Props = {
  result: Result | undefined;
};

export default function ResultView({ result }: Props) {
  return (
    result && (
      <>
        {result.type === "success" ? (
          <div className="border border-[#32CD32] rounded p-2 text-center bg-[#e6ffe6] text-[#32CD32]">
            {result.message}
          </div>
        ) : (
          <div className="border border-[#FF1E1E] rounded p-2 text-center bg-[#ffebef] text-[#FF1E1E]">
            {result.message}
          </div>
        )}
      </>
    )
  );
}
