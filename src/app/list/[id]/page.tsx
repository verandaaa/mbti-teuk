import usePostServer from "@/hooks/usePostServer";

export default async function DetailPage() {
  const { getPost } = usePostServer();
  const data = await getPost("6f196d52-162b-4b0b-8a42-0e7b7a67ad99");

  return (
    <>
      <div>{data.title}</div>
      <div>{data.description}</div>
      {data.author && <button>삭제</button>}
    </>
  );
}
