"use client";

import { useState } from "react";
import ResultView from "@/components/ResultView";
import { SignupUser } from "@/model/user";
import userUserClient from "@/hooks/useUserClient";

export default function SignupPage() {
  const [user, setUser] = useState<SignupUser>({
    email: "",
    mbti: "",
    nickname: "랜덤닉네임",
    password: "",
    passwordCheck: "",
  });
  const { handleSignUp, isVailidForm, result } = userUserClient();
  const mbtiList: string[] = require("/public/data/mbti_list.json");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isVailidForm(user)) {
      return;
    }

    handleSignUp(user);
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
          type="nickname"
          name="nickname"
          value={user.nickname}
          onChange={handleChange}
          className={formClassName}
          readOnly
        />
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
        <button className={formClassName + ` bg-button text-white`}>회원가입</button>
        <ResultView result={result} />
      </form>
    </div>
  );
}
