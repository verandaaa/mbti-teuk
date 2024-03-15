import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDetailPost } from "@/model/post";

export default function useUserServer() {
  const supabase = createServerComponentClient({ cookies });

  const getPost = async (postId: string): Promise<getDetailPost | null> => {
    const { data } = await supabase
      .from("posts")
      .select("*,options(value,imageId),...categories(categoryName:name)")
      .eq("id", postId)
      .returns<any[]>();

    if (data === null) {
      return null;
    }

    const post = data[0];

    console.log(post);

    return post;
  };

  return { getPost };
}
