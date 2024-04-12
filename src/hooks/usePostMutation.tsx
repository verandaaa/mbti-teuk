import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParticipate } from "@/service/postClient";

export function useMutationCreateParticipate() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { optionId: number; postId: string }>({
    mutationFn: ({ optionId, postId }) => createParticipate(optionId, postId),
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["result", postId] });
    },
  });

  return { mutation };
}
