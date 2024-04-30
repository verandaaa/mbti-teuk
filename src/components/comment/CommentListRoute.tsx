import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCommentCount, getCommentList } from "@/service/commentServer";
import getQueryClient from "@/lib/react-query/getQueryClient";
import CommentList from "@/components/comment/CommentList";

type Props = {
  postId: string;
};

export default async function CommentListRoute({ postId }: Props) {
  const queryClient = getQueryClient();
  const rowsPerPage = 20;
  await queryClient.prefetchQuery({ queryKey: ["commentCount", postId], queryFn: () => getCommentCount(postId) });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) => getCommentList(postId, pageParam * rowsPerPage, (pageParam + 1) * rowsPerPage - 1),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage?.length === 0 || (lastPage?.length ?? 0) < rowsPerPage ? undefined : nextPage;
    },
    pages: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommentList postId={postId} />
    </HydrationBoundary>
  );
}
