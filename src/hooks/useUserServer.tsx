import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function useUserServer() {
  const supabase = createServerComponentClient({ cookies });

  const getUser = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    const user = session
      ? {
          email: session.user.email!,
          mbti: session.user.user_metadata.mbti,
        }
      : null;
    return user;
  };

  return { getUser };
}
