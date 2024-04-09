import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParticipate } from "@/service/postClient";

export default function useCreateParticipate() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { optionId: number; postId: string }>({
    mutationFn: ({ optionId, postId }) => createParticipate(optionId, postId),
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["result", postId] });
    },
  });

  return { mutation };
}
