"use client";

import { useState } from "react";
import StatusView from "@/components/StatusView";
import { SigninUser } from "@/model/user";
import Link from "next/link";
import userUserClient from "@/hooks/useUserClient";
import useFormControl from "@/hooks/useFormControl";
import { useStatusContext } from "@/context/StatusContext";

export default function Signin() {
  const [user, setUser] = useState<SigninUser>({
    email: "",
    password: "",
  });
  const { signin } = userUserClient();
  const { handleSigninChange, isValidUserForm } = useFormControl();
  const { status, setStatus } = useStatusContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSigninChange(e, setUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidUserForm(user)) {
      signin(user);
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
        <button className={formClassName + ` bg-button text-white`}>로그인</button>
        <div className="text-sm text-center text-neutral-700 underline">
          <Link href="/signup" aria-label="회원가입">
            회원가입
          </Link>
        </div>
        <StatusView status={status} />
      </form>
    </div>
  );
}
