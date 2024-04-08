"use client";

import { deletePost } from "@/service/postClient";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  id: string;
};

export default function PostDeleteButton({ userId, id }: Props) {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleDeletePostButtonClick = () => {
    deletePost(id);
    router.push(`/list`);
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
