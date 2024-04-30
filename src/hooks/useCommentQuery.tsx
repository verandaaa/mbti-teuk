import { getCommentList } from "@/service/commentClient";
import { useQuery } from "@tanstack/react-query";

export function useQueryGetComment(postId: string) {
  const { data } = useQuery({ queryKey: ["comments", postId], queryFn: () => getCommentList(postId) });

  return { data };
}
