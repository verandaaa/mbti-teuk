"use client";

import usePostClient from "@/hooks/usePostClient";

type Props = {
  id: string;
};

export default function PostDeleteButton({ id }: Props) {
  const { deletePost } = usePostClient();

  return <button onClick={() => deletePost(id)}>{id} 삭제</button>;
}
