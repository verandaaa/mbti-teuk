import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDetailPost } from "@/model/post";

export default function useUserServer() {
  const supabase = createServerComponentClient({ cookies });

  const getPost = async (post_id: string): Promise<getDetailPost | null> => {
    const { data } = await supabase.from("posts").select().eq("id", post_id);

    if (data === null) {
      return data;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    let post = data[0];

    //임시
    post = { ...post, options: [{ text: "옵션1" }, { text: "옵션2" }] };

    if (session) {
      const { data: info } = await supabase.from("between_post_and_user").select().eq("post_id", post_id);
      if (info && info.length) {
        post = { ...post, author: info[0].user_id };
      }
    }

    console.log(post);

    return post;
  };

  return { getPost };
}
