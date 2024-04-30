import { createClient } from "@/lib/supabase/client";
import { CreateComment, GetComment } from "@/model/comment";
import { parseDate } from "@/util/date";

export async function createComment(comment: CreateComment) {
  const supabase = createClient();

  const { data, error } = await supabase.from("comments").insert({
    postId: comment.postId,
    text: comment.text,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCommentList(postId: string): Promise<GetComment[] | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("postId", postId)
    .order("createdAt", { ascending: false });

  if (data === null) {
    return null;
  }

  const comments = data.map((comment) => ({ ...comment, createdAt: parseDate(comment.createdAt) }));

  return comments;
}

export async function deleteComment(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("comments").delete().eq("id", id);
}
