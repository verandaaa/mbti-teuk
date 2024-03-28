"use client";

import PostDeleteButton from "@/components/PostDeleteButton";
import OptionList from "@/components/OptionList";
import Result from "@/components/Result";
import useGetPost from "@/hooks/useGetPost";

type Props = { id: string };

export default function Post({ id }: Props) {
  const { data } = useGetPost(id);

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
            {<OptionList options={data.options} postId={id} selectedOptionId={data.selectedOptionId} />}
          </div>
          {<Result postId={id} options={data.options} isShow={data.selectedOptionId !== null ? true : false} />}
        </div>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
