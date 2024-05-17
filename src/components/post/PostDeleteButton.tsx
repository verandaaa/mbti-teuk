"use client";

import { deletePost } from "@/service/postClient";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useMutationDeletePost } from "@/query/usePostMutation";

type Props = {
  userId: string;
  id: string;
};

export default function PostDeleteButton({ userId, id }: Props) {
  const { user } = useAuthContext();
  const router = useRouter();
  const { mutation } = useMutationDeletePost();

  const handleDeletePostButtonClick = () => {
    mutation.mutate({ id });
  };

  const isShow = userId === user?.userId;

  return (
    isShow && (
      <button className="text-gray-500 text-sm" onClick={handleDeletePostButtonClick}>
        삭제
      </button>
    )
  );
}
