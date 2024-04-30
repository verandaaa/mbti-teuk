import { CreateComment } from "@/model/comment";
import { Status } from "@/model/status";
import { createComment } from "@/service/commentClient";
import { handleFormError } from "@/util/error";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export function useMutationCreateComment(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const mutation = useMutation<void, Error, { comment: CreateComment }>({
    mutationFn: ({ comment }) => createComment(comment),
    onSuccess: () => {},
    onError: (error) => {
      setStatus(handleFormError(error));
    },
  });

  return { mutation };
}
