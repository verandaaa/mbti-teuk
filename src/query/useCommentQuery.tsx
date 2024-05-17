import { getCommentList, getCommentCount } from "@/service/commentClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useQueryGetCommentCount(postId: string) {
  const { data } = useQuery({ queryKey: ["commentCount", postId], queryFn: () => getCommentCount(postId) });

  return { data };
}

export function useQueryGetCommentList(postId: string) {
  const rowsPerPage = 20;
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getCommentList(postId, pageParam * rowsPerPage, (pageParam + 1) * rowsPerPage - 1),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage?.length === 0 || (lastPage?.length ?? 0) < rowsPerPage ? undefined : nextPage;
    },
  });

  const comments = data?.pages ?? [];

  return { comments, hasNextPage, fetchNextPage };
}
