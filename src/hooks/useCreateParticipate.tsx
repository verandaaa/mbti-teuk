import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePostClient from "@/hooks/usePostClient";

export default function useCreateParticipate() {
  const { createParticipate } = usePostClient();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { optionId: number; postId: string }>({
    mutationFn: ({ optionId, postId }) => createParticipate(optionId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  return { mutation };
}
