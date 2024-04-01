"use client";

import PostDeleteButton from "@/components/PostDeleteButton";
import OptionList from "@/components/OptionList";
import Result from "@/components/Result";
import { queryGetPost } from "@/util/postQuery";

type Props = { id: string };

export default function Post({ id }: Props) {
  const { data } = queryGetPost(id);

  return (
    <>
      {data && (
        <div className="p-6 border border-black rounded">
          <div>
            <span>&gt; {data.categoryName}</span>
            <h1>{data.title}</h1>
            <span>{data.userMbti}</span>
            <span>{data.userNickname}</span>
            <span>{data.createdAt}</span>
            <span>조회 : {data.viewCount}</span>
            {<PostDeleteButton userId={data.userId} id={id} />}
          </div>
          <div className="my-4 border-b border-black"></div>
          <div>
            <div>{data.description}</div>
            {<OptionList options={data.options} postId={id} selectedOptionId={data.selectedOptionId} />}
          </div>
          <span>{data.participateCount}명 참여</span>
          {<Result postId={id} options={data.options} isShow={data.selectedOptionId !== null ? true : false} />}
        </div>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
