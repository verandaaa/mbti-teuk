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
          {data.options.map((option, index) => {
            return (
              <div>
                <div>{option.text}</div>
                <img src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/images/${id}/image${index}.jpg`}></img>
              </div>
            );
          })}
        </>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
