import { useRouter } from "next/navigation";
import { SigninUser, SignupUser, getUser } from "@/model/user";
import { useStatusContext } from "@/context/StatusContext";
import { createClient } from "@/lib/supabase/client";

export default function userUserClient() {
  const supabase = createClient();
  const router = useRouter();
  const { status, setStatus } = useStatusContext();

  const signup = async (user: SignupUser) => {
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
        setStatus({ type: "error", message: "이미 가입한 이메일 입니다." });
      } else {
        setStatus({ type: "error", message: error.message });
      }
      return;
    }
    router.push("/");
    router.refresh();
  };

  const signin = async (user: SigninUser) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      if (error.message === "Invalid login credentials") {
        setStatus({
          type: "error",
          message: "이메일 혹은 비밀번호를 확인해주세요.",
        });
      } else {
        setStatus({ type: "error", message: error.message });
      }
      return;
    }
    router.push("/");
    router.refresh();
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return;
    }
    router.refresh();
  };

  const getUser = async (): Promise<getUser | null> => {
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
  };

  return { signup, signin, signout, getUser };
}
