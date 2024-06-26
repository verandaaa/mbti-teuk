"use client";

import { useState } from "react";
import StatusView from "@/components/common/StatusView";
import { SignupUser } from "@/model/user";
import { useChangeUserForm } from "@/hooks/useChangeForm";
import Button from "@/components/common/Button";
import { Status } from "@/model/status";
import { useValidUserForm } from "@/hooks/useValidForm";
import { useMutationSignup } from "@/query/useUserMutation";

export default function Signup() {
  const [user, setUser] = useState<SignupUser>({
    email: "",
    mbti: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const mbtiList: string[] = require("/public/data/mbti_list.json");
  const [status, setStatus] = useState<Status>();
  const { vaildUserForm } = useValidUserForm(setStatus);
  const { handleSignupChange } = useChangeUserForm();
  const { mutation } = useMutationSignup(setStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleSignupChange(e, setUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!vaildUserForm(user)) return;
    mutation.mutate({ user });
  };

  return (
    <div className="flex flex-col items-center gap-10 mx-auto my-16 py-16 border border-black rounded max-w-2xl">
      <h1 className="font-bold text-3xl">회원가입</h1>
      <form className="flex flex-col gap-6 w-2/3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="이메일"
          onChange={handleChange}
          className="el-primary"
        />
        <select name="mbti" onChange={handleChange} className="el-primary">
          <option value="">mbti 선택</option>
          {mbtiList.map((mbti, index) => (
            <option key={index} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="nickname"
          value={user.nickname}
          placeholder="닉네임"
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
        <input
          type="password"
          name="passwordCheck"
          value={user.passwordCheck}
          placeholder="비밀번호확인"
          onChange={handleChange}
          className="el-primary"
        />
        <Button style="default">회원가입</Button>
        <StatusView status={status} />
      </form>
    </div>
  );
}
