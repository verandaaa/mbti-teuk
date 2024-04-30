import NewComment from "@/components/comment/NewComment";

type Props = {
  postId: string;
};

export default function CommentList({ postId }: Props) {
  return (
    <>
      <span>댓글()</span>
      <NewComment postId={postId} />
    </>
  );
}
