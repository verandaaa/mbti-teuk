"use client";

import NewComment from "@/components/comment/NewComment";
import { useQueryGetCommentList } from "@/query/useCommentQuery";
import User from "@/components/user/User";
import CommentDeleteButton from "@/components/comment/CommentDeleteButton";
import { Fragment } from "react";
import { useQueryGetCommentCount } from "@/query/useCommentQuery";
import Button from "@/components/common/Button";

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  const { comments, hasNextPage, fetchNextPage } = useQueryGetCommentList(postId);
  const { data: commentCount } = useQueryGetCommentCount(postId);

  return (
    <>
      <h2 className="mt-12 font-bold text-xl">{`댓글(${commentCount})`}</h2>
      <NewComment postId={postId} />
      <div className="my-4">
        {comments?.map((group, index) => (
          <Fragment key={index}>
            {group?.map((comment) => (
              <div className="flex flex-col gap-2 my-4" key={index}>
                <div className="flex gap-x-3">
                  <User user={{ mbti: comment.userMbti, nickname: comment.userNickname }} componentType="comment" />
                  <div>
                    <span className="text-gray-500 text-xs">{comment.createdAt}</span>
                  </div>
                  <CommentDeleteButton userId={comment.userId} id={comment.id} postId={postId} />
                </div>
                <p className="pl-4">{comment.text}</p>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && (
        <Button style="more" onClick={() => fetchNextPage()}>
          댓글 더보기
        </Button>
      )}
    </>
  );
}
