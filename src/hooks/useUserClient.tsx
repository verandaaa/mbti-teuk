import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SigninUser, SignupUser } from "@/model/user";
import { useStatusContext } from "@/context/StatusContext";

export default function userUserClient() {
  const supabase = createClientComponentClient();
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

  return { signup, signin, signout };
}
