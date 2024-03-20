import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import Post from "@/components/Post";
import usePostServer from "@/hooks/usePostServer";

type Props = {
  id: string;
};

export default async function PostRoute({ id }: Props) {
  const { getPost } = usePostServer();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["post"], queryFn: () => getPost(id) });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Post id={id} />
    </HydrationBoundary>
  );
}
