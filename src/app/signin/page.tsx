"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResultView from "@/components/ResultView";
import { SigninUser } from "@/model/user";
import { Result } from "@/model/result";
import { supabase } from "@/lib/supabase/supabase-client";
import Link from "next/link";

export default function SigninPage() {
  const [user, setUser] = useState<SigninUser>({
    email: "",
    password: "",
  });
  const [result, setResult] = useState<Result>();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isVailidForm()) {
      return;
    }

    handleSignIn();
  };

  const isVailidForm = () => {
    if (!user.email.match(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      setResult({ type: "error", message: "올바른 이메일 형식을 입력하세요." });
      return false;
    }
    if (user.password.length < 6) {
      setResult({
        type: "error",
        message: "비밀번호는 최소 6글자 이상입니다.",
      });
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
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
  };

  const formClassName = "border border-black rounded p-2";

  return (
    <div className="max-w-2xl mx-auto border border-black rounded flex flex-col items-center gap-10 py-16 my-16">
      <h1 className="text-3xl font-bold">로그인</h1>
      <form className="flex flex-col gap-6 w-2/3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="이메일"
          onChange={handleChange}
          className={formClassName}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="비밀번호"
          onChange={handleChange}
          className={formClassName}
        />
        <button className={formClassName + ` bg-button text-white`}>
          로그인
        </button>
        <div className="text-sm text-center text-neutral-700 underline">
          <Link href="/signup" aria-label="회원가입">
            회원가입
          </Link>
        </div>
        <ResultView result={result} />
      </form>
    </div>
  );
}
