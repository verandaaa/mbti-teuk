import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDetailPost } from "@/model/post";

export default function useUserServer() {
  const supabase = createServerComponentClient({ cookies });

  const getPost = async (postId: string): Promise<getDetailPost | null> => {
    const { data, error } = await supabase
      .from("postView")
      .select("*,options(id,value,imageId)")
      .eq("id", postId)
      .returns<any[]>();

    if (data === null) {
      return null;
    }

    const post = data[0];

    return post;
  };

  return { getPost };
}
