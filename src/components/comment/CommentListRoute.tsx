import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCommentList } from "@/service/commentServer";
import getQueryClient from "@/lib/react-query/getQueryClient";
import CommentList from "@/components/comment/CommentList";

type Props = {
  postId: string;
};

export default async function CommentListRoute({ postId }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["comments", postId], queryFn: () => getCommentList(postId) });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommentList postId={postId} />
    </HydrationBoundary>
  );
}
