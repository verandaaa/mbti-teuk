"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ResultView from "@/components/ResultView";
import { SignupUser } from "@/model/user";
import { Result } from "@/model/result";

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

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("mbti", user.mbti);
    formData.append("password", user.password);

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.type === "error") {
      setResult({ type: data.type, message: "회원가입에 실패하였습니다." });
      return;
    }
    router.replace("/");
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

  return (
    <div className="border border-black">
      <h1>회원가입</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="이메일"
          onChange={handleChange}
        />
        <select name="mbti" onChange={handleChange}>
          <option value="select">mbti 선택</option>
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
        />
        <input
          type="password"
          name="passwordCheck"
          value={user.passwordCheck}
          placeholder="비밀번호확인"
          onChange={handleChange}
        />
        <button>회원가입</button>
        <ResultView result={result} />
      </form>
    </div>
  );
}
