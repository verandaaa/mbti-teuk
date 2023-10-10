import usePostServer from "@/hooks/usePostServer";
import PostDeleteButton from "@/components/PostDeleteButton";

type Props = { params: { id: string } };

export default async function DetailPage({ params: { id } }: Props) {
  const { getPost } = usePostServer();
  const data = await getPost(id);

  return (
    <>
      {data && (
        <>
          <div>{data.title}</div>
          <div>{data.description}</div>
          {data.author && <PostDeleteButton id={id} />}
        </>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
