import { useState } from "react";
import { Status } from "@/model/status";
import { AuthError } from "@supabase/supabase-js";

export default function useStatus() {
  const [status, setStatus] = useState<Status>();

  const handleSignupError = (error: AuthError | null) => {
    if (error) {
      if (error.message === "User already registered") {
        setStatus({ type: "error", message: "이미 가입한 이메일 입니다." });
      } else {
        setStatus({ type: "error", message: error.message });
      }
    }
  };

  const handleSigninError = (error: AuthError | null) => {
    if (error) {
      if (error.message === "Invalid login credentials") {
        setStatus({ type: "error", message: "이메일 혹은 비밀번호를 확인해주세요." });
      } else {
        setStatus({ type: "error", message: error.message });
      }
    }
  };

  const handleFormError = (error: Error | null) => {
    if (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return { status, handleSignupError, handleSigninError, handleFormError };
}
