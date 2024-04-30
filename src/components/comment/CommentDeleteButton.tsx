"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useMutationDeleteComment } from "@/hooks/useCommentMutation";
import { TiDelete } from "react-icons/ti";

type Props = {
  userId: string;
  id: number;
  postId: string;
};

export default function CommentDeleteButton({ userId, id, postId }: Props) {
  const { user } = useAuthContext();
  const { mutation } = useMutationDeleteComment();

  const handleDeleteCommentButtonClick = () => {
    mutation.mutate({ id, postId });
  };

  const isShow = userId === user?.userId;

  return (
    isShow && (
      <button className="text-gray-500" onClick={handleDeleteCommentButtonClick}>
        <TiDelete size={20} />
      </button>
    )
  );
}
