import { createClient } from "@/lib/supabase/server";
import { GetDetailPost } from "@/model/post";

export async function getPost(postId: string): Promise<GetDetailPost | null> {
  const supabase = createClient();
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
}
