import { createClient } from "@/lib/supabase/server";
import { GetDetailPost, GetPost } from "@/model/post";
import { parseDate } from "@/util/date";

export async function getPostList(): Promise<GetPost[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("postView").select();

  return data;
}

export async function getPost(postId: string): Promise<GetDetailPost | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("postView")
    .select("*,options(id,value,imageId,participateCount)")
    .eq("id", postId)
    .order("id", { referencedTable: "options" })
    .limit(1)
    .single();

  if (data === null) {
    return null;
  }

  const post = { ...data, createdAt: parseDate(data.createdAt) };

  return post;
}
