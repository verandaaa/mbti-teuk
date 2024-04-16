"use client";

import { Status } from "@/model/status";

type Props = {
  status: Status | undefined;
};

export default function StatusView({ status }: Props) {
  if (!status) {
    return <></>;
  }
  const variants = {
    success:
      "el-primary text-center border-status-success-default bg-status-success-background text-status-success-default",
    error: "el-primary text-center border-status-error-default bg-status-error-background text-status-error-default",
  };

  return <div className={variants[status.type]}>{status.message}</div>;
}
