"use client";

import NewComment from "@/components/comment/NewComment";
import { useQueryGetComment } from "@/hooks/useCommentQuery";
import User from "@/components/user/User";

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  const { data: comments } = useQueryGetComment(postId);
  return (
    <>
      <h2 className="mt-12 font-bold text-xl">{`댓글(${comments ? comments.length : 0})`}</h2>
      <NewComment postId={postId} />
      <div className="my-4">
        {comments?.map((comment, index) => (
          <div className="flex flex-col gap-2 my-4" key={index}>
            <div className="flex gap-x-3">
              <User user={{ mbti: comment.userMbti, nickname: comment.userNickname }} componentType="comment" />
              <div>
                <span className="text-gray-500 text-xs">{comment.createdAt}</span>
              </div>
            </div>
            <p className="pl-4">{comment.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
