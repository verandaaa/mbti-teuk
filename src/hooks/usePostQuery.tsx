import { useQuery } from "@tanstack/react-query";
import { getPostList, getPost, getParticipateResult } from "@/service/postClient";

export function useQueryGetPostList() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: () => getPostList() });

  return { data };
}

export function useQueryGetPost(id: string) {
  const { data } = useQuery({ queryKey: ["post", id], queryFn: () => getPost(id) });

  return { data };
}

export function useQueryGetParticipateResult(postId: string) {
  const { data, isLoading } = useQuery({ queryKey: ["result", postId], queryFn: () => getParticipateResult(postId) });

  return { data, isLoading };
}
