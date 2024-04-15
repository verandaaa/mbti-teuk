import { SigninUser, SignupUser, GetUser } from "@/model/user";
import { createClient } from "@/lib/supabase/client";

export async function signup(user: SignupUser) {
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
    throw new Error(error.message);
  }
}

export async function signin(user: SigninUser) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signinAnonymously(mbti: String) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        mbti,
        nickname: "익명",
      },
    },
  });
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
}

export async function getNewNickname() {
  const supabase = createClient();
  const { data, error } = await supabase.from("uniqueRandomNicknameView").select().limit(1).single();
  const nickname = data.nickname;

  return { data: nickname };
}
