"use client";

import { deletePost } from "@/service/postClient";
import { useAuthContext } from "@/context/AuthContext";

type Props = {
  userId: string;
  id: string;
};

export default function PostDeleteButton({ userId, id }: Props) {
  const { user } = useAuthContext();

  const handleDeletePostButtonClick = () => {
    deletePost(id);
  };

  const isShow = userId === user?.userId;

  return isShow && <button onClick={handleDeletePostButtonClick}>삭제</button>;
}
