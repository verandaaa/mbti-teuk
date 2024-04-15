import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, createParticipate, deletePost } from "@/service/postClient";
import { CreatePost } from "@/model/post";
import { useRouter } from "next/navigation";
import { handleCreatePostError } from "@/util/error";
import { Dispatch, SetStateAction } from "react";
import { Status } from "@/model/status";

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

export function useMutationCreatePost(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const router = useRouter();

  const mutation = useMutation<void, Error, { post: CreatePost }>({
    mutationFn: ({ post }) => createPost(post),
    onSuccess: (data, { post }) => {
      router.push(`/list/${post.id}`);
    },
    onError: (error) => {
      setStatus(handleCreatePostError(error));
    },
  });

  return { mutation };
}

export function useMutationDeletePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<void, Error, { id: string }>({
    mutationFn: ({ id }) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(`/list`);
    },
  });

  return { mutation };
}
