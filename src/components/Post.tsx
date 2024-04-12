"use client";

import PostDeleteButton from "@/components/PostDeleteButton";
import OptionList from "@/components/OptionList";
import Result from "@/components/Result";
import { useQueryGetPost } from "@/hooks/usePostQuery";
import User from "@/components/User";
import { useAuthContext } from "@/context/AuthContext";
import { MdOutlineHowToVote } from "react-icons/md";

type Props = { id: string };

export default function Post({ id }: Props) {
  const { data } = useQueryGetPost(id);
  const { user } = useAuthContext();

  return (
    <>
      {data && (
        <div className="p-6 border border-black rounded">
          <div className="flex flex-col gap-y-1.5">
            <div>
              <span>&gt; {data.categoryName}</span>
            </div>
            <div>
              <span className="text-2xl">{data.title}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-3">
                <User user={{ mbti: data.userMbti, nickname: data.userNickname }} componentType="post" />
                <div>
                  <span className="text-gray-500 text-xs">{data.createdAt}</span>
                </div>
              </div>
              <div> {<PostDeleteButton userId={data.userId} id={id} />}</div>
            </div>
          </div>
          <div className="my-4 border-b border-black"></div>
          <div>
            <div>{data.description}</div>
            {<OptionList options={data.options} postId={id} selectedOptionId={data.selectedOptionId} />}
          </div>
          <div className="flex items-center gap-x-2">
            <MdOutlineHowToVote size={18} />
            <span>{data.participateCount}명 참여</span>
          </div>
          <div className="m-10"></div>
          {data.selectedOptionId && user && (
            <Result
              postId={id}
              options={data.options}
              selectedOptionId={data.selectedOptionId.toString()}
              userMbti={user.mbti}
            />
          )}
        </div>
      )}
      {!data && <div>존재하지 않은 게시글입니다.</div>}
    </>
  );
}
