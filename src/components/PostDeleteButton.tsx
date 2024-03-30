"use client";

import { deletePost } from "@/service/postClient";

type Props = {
  id: string;
};

export default function PostDeleteButton({ id }: Props) {
  const handleDeletePostButtonClick = () => {
    deletePost(id);
  };

  return <button onClick={handleDeletePostButtonClick}>{id} 삭제</button>;
}
