import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPostList, getPost, getParticipateResult } from "@/service/postClient";

export function useQueryGetPostList() {
  const rowsPerPage = 15;
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPostList(pageParam * rowsPerPage, (pageParam + 1) * rowsPerPage - 1),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage?.length === 0 || (lastPage?.length ?? 0) < rowsPerPage ? undefined : nextPage;
    },
  });

  const posts = data?.pages ?? [];

  return { posts, fetchNextPage };
}

export function useQueryGetPost(id: string) {
  const { data } = useQuery({ queryKey: ["post", id], queryFn: () => getPost(id) });

  return { data };
}

export function useQueryGetParticipateResult(postId: string) {
  const { data, isLoading } = useQuery({ queryKey: ["result", postId], queryFn: () => getParticipateResult(postId) });

  return { data, isLoading };
}
