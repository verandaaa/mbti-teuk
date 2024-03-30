import { createClient } from "@/lib/supabase/server";
import { getDetailPost } from "@/model/post";

export default function useUserServer() {
  const supabase = createClient();

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
