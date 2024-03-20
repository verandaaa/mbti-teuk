import { useQuery } from "@tanstack/react-query";
import usePostClient from "@/hooks/usePostClient";

export default function useGetPost(id: string) {
  const { getPost } = usePostClient();
  const { data } = useQuery({ queryKey: ["post"], queryFn: () => getPost(id) });

  return { data };
}
