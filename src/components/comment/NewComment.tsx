"use client";

import User from "@/components/user/User";
import { useAuthContext } from "@/context/AuthContext";
import { CreateComment } from "@/model/comment";
import { useState } from "react";
import Button from "@/components/common/Button";
import { useChangeCommentForm } from "@/hooks/useChangeForm";
import { useValidCommentForm } from "@/hooks/useValidForm";
import { Status } from "@/model/status";
import { useMutationCreateComment } from "@/query/useCommentMutation";
import StatusView from "@/components/common/StatusView";
import SelectSigninModal from "../modal/SelectSigninModal";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCommentChange(e, setComment);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vaildCommentForm(comment)) return;
    mutation.mutate({ comment });
    setComment((comment) => ({ ...comment, text: "" }));
  };

  const hanldeInputFocus = () => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 my-8">
        {user && <User user={user} componentType="comment" />}
        <form className="flex gap-1" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            value={comment.text}
            placeholder="댓글을 입력하세요."
            onChange={handleChange}
            onFocus={hanldeInputFocus}
            autoComplete="off"
            className="w-full el-primary"
          />
          <Button style="comment">등록</Button>
        </form>
        <StatusView status={status} />
      </div>
      {isModalOpen && <SelectSigninModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
