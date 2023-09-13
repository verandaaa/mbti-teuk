"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResultView from "@/components/ResultView";
import { SignupUser } from "@/model/user";
import { Result } from "@/model/result";
import { supabase } from "@/lib/supabase/supabase-client";

export default function SignupPage() {
  const [user, setUser] = useState<SignupUser>({
    email: "",
    mbti: "",
    password: "",
    passwordCheck: "",
  });
  const [result, setResult] = useState<Result>();
  const router = useRouter();
  const mbtiList = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

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

    handleSignUp();
  };

  const isVailidForm = () => {
    if (!user.email.match(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      setResult({ type: "error", message: "올바른 이메일 형식을 입력하세요." });
      return false;
    }
    if (!mbtiList.includes(user.mbti)) {
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
    if (user.password !== user.passwordCheck) {
      setResult({ type: "error", message: "비밀번호가 일치하지 않습니다." });
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          mbti: user.mbti,
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

  const formClassName = "border border-black rounded p-2";

  return (
    <div className="max-w-2xl mx-auto border border-black rounded flex flex-col items-center gap-10 py-16 my-16">
      <h1 className="text-3xl font-bold">회원가입</h1>
      <form className="flex flex-col gap-6 w-2/3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="이메일"
          onChange={handleChange}
          className={formClassName}
        />
        <select name="mbti" onChange={handleChange} className={formClassName}>
          <option value="default">mbti 선택</option>
          {mbtiList.map((mbti, index) => (
            <option key={index} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="비밀번호"
          onChange={handleChange}
          className={formClassName}
        />
        <input
          type="password"
          name="passwordCheck"
          value={user.passwordCheck}
          placeholder="비밀번호확인"
          onChange={handleChange}
          className={formClassName}
        />
        <button className={formClassName + ` bg-button text-white`}>
          회원가입
        </button>
        <ResultView result={result} />
      </form>
    </div>
  );
}
