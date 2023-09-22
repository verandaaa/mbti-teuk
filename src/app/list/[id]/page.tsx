import usePostServer from "@/hooks/usePostServer";
import PostDeleteButton from "@/components/PostDeleteButton";

export default async function DetailPage() {
  const id = "3066a4b4-8908-4953-a078-d7bb950206cf";

  const { getPost } = usePostServer();
  const data = await getPost(id);

  return (
    <>
      <div>{data.title}</div>
      <div>{data.description}</div>
      {data.author && <PostDeleteButton id={id} />}
    </>
  );
}
