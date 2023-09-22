import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function useUserServer() {
  const supabase = createServerComponentClient({ cookies });

  const getPost = async (post_id: string) => {
    const { data } = await supabase.from("posts").select().eq("id", post_id);

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    let post;
    if (data) {
      post = data[0];
    }

    if (session) {
      const { data: info } = await supabase
        .from("between_post_and_user")
        .select()
        .eq("post_id", post_id);
      if (info && info.length) {
        post = { ...post, author: info[0].user_id };
      }
    }
    return post;
  };

  return { getPost };
}
