"use client";

import usePostClient from "@/hooks/usePostClient";

type Props = {
  id: string;
};

export default function PostDeleteButton({ id }: Props) {
  const { deletePost } = usePostClient();

  const handleDeletePostButtonClick = () => {
    deletePost(id);
  };

  return <button onClick={handleDeletePostButtonClick}>{id} 삭제</button>;
}
