"use client";

import { Status } from "@/model/status";

type Props = {
  status: Status | undefined;
};

export default function StatusView({ status }: Props) {
  return (
    status && (
      <>
        {status.type === "success" ? (
          <div className="border border-[#32CD32] rounded p-2 text-center bg-[#e6ffe6] text-[#32CD32]">
            {status.message}
          </div>
        ) : (
          <div className="border border-[#FF1E1E] rounded p-2 text-center bg-[#ffebef] text-[#FF1E1E]">
            {status.message}
          </div>
        )}
      </>
    )
  );
}
