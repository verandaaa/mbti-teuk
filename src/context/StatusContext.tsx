"use client";

import { createContext, useContext, useState, PropsWithChildren, Dispatch, SetStateAction } from "react";
import { Status } from "@/model/status";

type StatusContextType = {
  status: Status | undefined;
  setStatus: Dispatch<SetStateAction<Status | undefined>>;
};

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusContextProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<Status>();

  return <StatusContext.Provider value={{ status, setStatus }}>{children}</StatusContext.Provider>;
}

export function useStatusContext() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
}
