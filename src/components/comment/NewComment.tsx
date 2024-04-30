"use client";

import User from "@/components/user/User";
import { useAuthContext } from "@/context/AuthContext";
import { CreateComment } from "@/model/comment";
import { useState } from "react";
import Button from "@/components/common/Button";
import { useChangeCommentForm } from "@/hooks/useChangeForm";
import { useValidCommentForm } from "@/hooks/useValidForm";
import { Status } from "@/model/status";
import { useMutationCreateComment } from "@/hooks/useCommentMutation";
import StatusView from "../common/StatusView";

type Props = {
  postId: string;
};

export default function NewComment({ postId }: Props) {
  const { user } = useAuthContext();
  const [comment, setComment] = useState<CreateComment>({
    text: "",
    postId: postId,
  });
  const [status, setStatus] = useState<Status>();
  const { handleCommentChange } = useChangeCommentForm();
  const { vaildCommentForm } = useValidCommentForm(setStatus);
  const { mutation } = useMutationCreateComment(setStatus);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCommentChange(e, setComment);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vaildCommentForm(comment)) return;
    mutation.mutate({ comment });
    setComment((comment) => ({ ...comment, text: "" }));
  };

  return (
    <div className="flex flex-col gap-2 my-8">
      {user && <User user={user} componentType="comment" />}
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={comment.text}
          placeholder="댓글을 입력하세요."
          onChange={handleChange}
          className="w-full el-primary"
        />
        <Button style="comment">등록</Button>
      </form>
      <StatusView status={status} />
    </div>
  );
}
