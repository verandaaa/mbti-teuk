"use client";

import { deletePost } from "@/service/postClient";

type Props = {
  isShow: boolean;
  id: string;
};

export default function PostDeleteButton({ isShow, id }: Props) {
  const handleDeletePostButtonClick = () => {
    deletePost(id);
  };

  return isShow && <button onClick={handleDeletePostButtonClick}>삭제</button>;
}
