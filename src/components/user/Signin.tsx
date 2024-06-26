"use client";

import { useState } from "react";
import StatusView from "@/components/common/StatusView";
import { SigninUser } from "@/model/user";
import Link from "next/link";
import { useChangeUserForm } from "@/hooks/useChangeForm";
import Button from "@/components/common/Button";
import { Status } from "@/model/status";
import { useValidUserForm } from "@/hooks/useValidForm";
import { useMutationSignin } from "@/query/useUserMutation";

export default function Signin() {
  const [user, setUser] = useState<SigninUser>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<Status>();
  const { vaildUserForm } = useValidUserForm(setStatus);
  const { handleSigninChange } = useChangeUserForm();
  const { mutation } = useMutationSignin(setStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSigninChange(e, setUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!vaildUserForm(user)) return;
    mutation.mutate({ user });
  };

  return (
    <div className="flex flex-col items-center gap-10 mx-auto my-16 py-16 border border-black rounded max-w-2xl">
      <h1 className="font-bold text-3xl">로그인</h1>
      <form className="flex flex-col gap-6 w-2/3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="이메일"
          onChange={handleChange}
          className="el-primary"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="비밀번호"
          onChange={handleChange}
          className="el-primary"
        />
        <Button style="default">로그인</Button>
        <div className="text-center text-neutral-700 text-sm underline">
          <Link href="/signup" aria-label="회원가입">
            회원가입
          </Link>
        </div>
        <StatusView status={status} />
      </form>
    </div>
  );
}
