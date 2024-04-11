import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPostList } from "@/service/postServer";
import getQueryClient from "@/lib/react-query/getQueryClient";
import PostList from "@/components/PostList";

export default async function PostRoute() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["posts"], queryFn: () => getPostList() });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostList />
    </HydrationBoundary>
  );
}
