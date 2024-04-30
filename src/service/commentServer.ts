import { createClient } from "@/lib/supabase/server";
import { GetComment } from "@/model/comment";
import { parseDate } from "@/util/date";

export async function getCommentCount(postId: string): Promise<number | null> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("postId", postId);

  return count;
}

export async function getCommentList(postId: string, start: number, end: number): Promise<GetComment[] | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("postId", postId)
    .order("createdAt", { ascending: false })
    .range(start, end);

  if (data === null) {
    return null;
  }

  const comments = data.map((comment) => ({ ...comment, createdAt: parseDate(comment.createdAt) }));

  return comments;
}
