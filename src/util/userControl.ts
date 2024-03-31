import { Status } from "@/model/status";
import { AuthError } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";

export function handleSignupError(error: AuthError | null, setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  if (error) {
    if (error.message === "User already registered") {
      setStatus({ type: "error", message: "이미 가입한 이메일 입니다." });
    } else {
      setStatus({ type: "error", message: error.message });
    }
  }
}

export function handleSigninError(error: AuthError | null, setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  if (error) {
    if (error.message === "Invalid login credentials") {
      setStatus({ type: "error", message: "이메일 혹은 비밀번호를 확인해주세요." });
    } else {
      setStatus({ type: "error", message: error.message });
    }
  }
}
