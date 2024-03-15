import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Result } from "@/model/result";
import { useState } from "react";
import { SigninUser, SignupUser } from "@/model/user";

export default function userUserClient() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [result, setResult] = useState<Result>();
  const mbtiList: string[] = require("/public/data/mbti_list.json");

  const handleSignUp = async (user: SignupUser) => {
    const { error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          mbti: user.mbti,
          nickname: user.nickname,
        },
      },
    });
    if (error) {
      if (error.message === "User already registered") {
        setResult({ type: "error", message: "이미 가입한 이메일 입니다." });
      } else {
        setResult({ type: "error", message: error.message });
      }
      return;
    }
    router.push("/");
    router.refresh();
  };

  const handleSignIn = async (user: SigninUser) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      if (error.message === "Invalid login credentials") {
        setResult({
          type: "error",
          message: "이메일 혹은 비밀번호를 확인해주세요.",
        });
      } else {
        setResult({ type: "error", message: error.message });
      }
      return;
    }
    router.push("/");
    router.refresh();
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return;
    }
    router.refresh();
  };

  const isVailidForm = (user: SignupUser | SigninUser) => {
    if (!user.email.match(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      setResult({ type: "error", message: "올바른 이메일 형식을 입력하세요." });
      return false;
    }
    if ("mbti" in user && !mbtiList.includes(user.mbti)) {
      setResult({ type: "error", message: "MBTI를 선택해주세요." });
      return false;
    }
    if (user.password.length < 6) {
      setResult({
        type: "error",
        message: "비밀번호는 최소 6글자 이상입니다.",
      });
      return false;
    }
    if ("passwordCheck" in user && user.password !== user.passwordCheck) {
      setResult({ type: "error", message: "비밀번호가 일치하지 않습니다." });
      return false;
    }
    return true;
  };

  return { handleSignUp, handleSignIn, handleSignOut, isVailidForm, result };
}
