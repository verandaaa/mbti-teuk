import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParticipate } from "@/service/postClient";

export default function useCreateParticipate() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { optionId: number; postId: string }>({
    mutationFn: ({ optionId, postId }) => createParticipate(optionId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  return { mutation };
}
