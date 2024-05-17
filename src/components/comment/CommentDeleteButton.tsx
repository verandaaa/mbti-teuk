"use client";

import useUserStore from "@/store/user";
import { useMutationDeleteComment } from "@/query/useCommentMutation";
import { TiDelete } from "react-icons/ti";

type Props = {
  userId: string;
  id: number;
  postId: string;
};

export default function CommentDeleteButton({ userId, id, postId }: Props) {
  const user = useUserStore((state) => state.user);
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
