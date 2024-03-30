import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/service/postClient";

export default function useGetPost(id: string) {
  const { data } = useQuery({ queryKey: ["post"], queryFn: () => getPost(id) });

  return { data };
}
