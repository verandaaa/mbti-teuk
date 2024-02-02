import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDetailPost } from "@/model/post";
import camelcaseKeys from "camelcase-keys";

export default function useUserServer() {
  const supabase = createServerComponentClient({ cookies });

  const getPost = async (post_id: string): Promise<getDetailPost | null> => {
    const { data } = await supabase.from("posts").select().eq("id", post_id);

    if (data === null) {
      return null;
    }

    const post = camelcaseKeys(data[0], { deep: true });

    return post;
  };

  return { getPost };
}
