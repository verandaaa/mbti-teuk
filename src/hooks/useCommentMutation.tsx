import { CreateComment } from "@/model/comment";
import { Status } from "@/model/status";
import { createComment, deleteComment } from "@/service/commentClient";
import { handleFormError } from "@/util/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export function useMutationCreateComment(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { comment: CreateComment }>({
    mutationFn: ({ comment }) => createComment(comment),
    onSuccess: (data, { comment }) => {
      queryClient.invalidateQueries({ queryKey: ["commentCount", comment.postId] });
      queryClient.invalidateQueries({ queryKey: ["comments", comment.postId] });
    },
    onError: (error) => {
      setStatus(handleFormError(error));
    },
  });

  return { mutation };
}

export function useMutationDeleteComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { id: number; postId: string }>({
    mutationFn: ({ id }) => deleteComment(id),
    onSuccess: (data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["commentCount", postId] });
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return { mutation };
}
