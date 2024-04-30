import { SigninUser, SignupUser, GetUser } from "@/model/user";
import { createClient } from "@/lib/supabase/client";

export async function signup(user: SignupUser) {
  const supabase = createClient();

  const { count } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("nickname", user.nickname);
  if (count !== 0) {
    throw new Error("존재하는 닉네임 입니다.");
  }

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
