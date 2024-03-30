"use client";

import { SigninUser, SignupUser, GetUser } from "@/model/user";
import { createClient } from "@/lib/supabase/client";
import { Status } from "@/model/status";

export async function signup(user: SignupUser): Promise<Status> {
  const supabase = createClient();
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
      return { type: "error", message: "이미 가입한 이메일 입니다." };
    } else {
      return { type: "error", message: error.message };
    }
  }
  return { type: "success", message: "성공" };
}

export async function signin(user: SigninUser): Promise<Status> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    if (error.message === "Invalid login credentials") {
      return {
        type: "error",
        message: "이메일 혹은 비밀번호를 확인해주세요.",
      };
    } else {
      return { type: "error", message: error.message };
    }
  }
  return { type: "success", message: "성공" };
}

export async function signout(): Promise<Status> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { type: "error", message: error.message };
  }
  return { type: "success", message: "성공" };
}

export async function getUser(): Promise<GetUser | null> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const userInfo = {
    mbti: user.user_metadata.mbti,
    nickname: user.user_metadata.nickname,
  };

  return userInfo;
}
