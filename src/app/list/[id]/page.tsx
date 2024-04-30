import PostRoute from "@/components/post/PostRoute";
import CommentList from "@/components/comment/CommentList";

type Props = { params: { id: string } };

export default async function DetailPage({ params: { id } }: Props) {
  return (
    <>
      <PostRoute id={id} />
      <CommentList postId={id} />
    </>
  );
}
