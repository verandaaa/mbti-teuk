import { useQuery } from "@tanstack/react-query";
import { getPost, getParticipateResult } from "@/service/postClient";

export function queryGetPost(id: string) {
  const { data } = useQuery({ queryKey: ["post", id], queryFn: () => getPost(id) });

  return { data };
}

export function queryGetParticipateResult(postId: string) {
  const { data, isLoading } = useQuery({ queryKey: ["result", postId], queryFn: () => getParticipateResult(postId) });

  return { data, isLoading };
}
