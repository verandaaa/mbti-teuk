"use client";

import { Status } from "@/model/status";

type Props = {
  status: Status | undefined;
};

export default function StatusView({ status }: Props) {
  if (!status) {
    return <></>;
  }
  const style = `border border-status-${status.type}-default rounded p-2 text-center bg-status-${status.type}-background text-status-${status.type}-default`;

  return <div className={style}>{status.message}</div>;
}
