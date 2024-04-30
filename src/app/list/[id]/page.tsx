import PostRoute from "@/components/post/PostRoute";
import CommentListRoute from "@/components/comment/CommentListRoute";

type Props = { params: { id: string } };

export default async function DetailPage({ params: { id } }: Props) {
  return (
    <>
      <PostRoute id={id} />
      <CommentListRoute postId={id} />
    </>
  );
}
