import { createClient } from "@/lib/supabase/client";
import { CreateComment } from "@/model/comment";

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
