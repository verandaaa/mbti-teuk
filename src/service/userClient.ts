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

  return { error };
}

export async function signin(user: SigninUser) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  return { error };
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  return { error };
}
