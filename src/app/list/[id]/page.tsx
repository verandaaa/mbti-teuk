import usePostServer from "@/hooks/usePostServer";
import PostDeleteButton from "@/components/PostDeleteButton";
import Options from "@/components/Options";
import Graph from "@/components/Graph";

type Props = { params: { id: string } };

export default async function DetailPage({ params: { id } }: Props) {
  const { getPost } = usePostServer();
  const data = await getPost(id);

  return (
    <>
      {data && (
        <div className="border border-black rounded p-6">
          <div>
            <span>&gt; {data.categoryName}</span>
            <h1>{data.title}</h1>
            {<PostDeleteButton id={id} />}
          </div>
          <div className="border-b border-black my-4"></div>
          <div>
            <div>{data.description}</div>
            {<Options options={data.options} postId={id} selectedOptionId={data.selectedOptionId} />}
          </div>
          {data.selectedOptionId !== null && <Graph postId={id} options={data.options} />}
        </div>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
