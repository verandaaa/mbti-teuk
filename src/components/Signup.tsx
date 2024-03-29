"use client";

import { useState } from "react";
import StatusView from "@/components/StatusView";
import { SignupUser } from "@/model/user";
import userUserClient from "@/hooks/useUserClient";
import useFormControl from "@/hooks/useFormControl";
import { useStatusContext } from "@/context/StatusContext";
import Button from "@/components/Button";

export default function Signup() {
  const [user, setUser] = useState<SignupUser>({
    email: "",
    mbti: "",
    nickname: "랜덤닉네임",
    password: "",
    passwordCheck: "",
  });
  const { signup } = userUserClient();
  const mbtiList: string[] = require("/public/data/mbti_list.json");
  const { handleSignupChange, isValidUserForm } = useFormControl();
  const { status, setStatus } = useStatusContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleSignupChange(e, setUser);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidUserForm(user)) {
      signup(user);
    }
  };

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
          className="el-primary"
        />
        <select name="mbti" onChange={handleChange} className="el-primary">
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
          className="el-primary"
          readOnly
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
