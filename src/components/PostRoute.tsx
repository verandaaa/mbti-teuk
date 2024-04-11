import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Post from "@/components/Post";
import { getPost } from "@/service/postServer";
import getQueryClient from "@/lib/react-query/getQueryClient";

type Props = {
  id: string;
};

export default async function PostRoute({ id }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["post", id], queryFn: () => getPost(id) });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Post id={id} />
    </HydrationBoundary>
  );
}
