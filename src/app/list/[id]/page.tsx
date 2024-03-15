import usePostServer from "@/hooks/usePostServer";
import PostDeleteButton from "@/components/PostDeleteButton";

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
            <div>
              {data.options.map((option, index) => {
                return (
                  <div className="flex border border-gray-400 rounded my-2 h-32">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/images/${id}/${option.imageId}.jpg`}
                      alt="option-image"
                      className="aspect-square object-cover"
                    />
                    <div className="flex items-center mx-4">{option.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
