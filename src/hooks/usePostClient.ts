import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Result } from "@/model/result";
import { useState } from "react";
import { CreatePost } from "@/model/post";
import { v4 as uuidv4 } from "uuid";

export default function usePostClient() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [result, setResult] = useState<Result>();

  const createPost = async (post: CreatePost) => {
    const uuid = uuidv4();
    for (let i = 0; i < post.options.length; i++) {
      const image = post.options[i].image;
      if (!image) {
        continue;
      }
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${uuid}/image${i}.jpg`, image, {
          cacheControl: "3600",
          upsert: false,
        });
      //error 발생시
      //setResult
      //등록한 이미지 삭제
      //return 시켜버림
    }
    //db에 보내기
    const { error } = await supabase
      .from("posts")
      .insert({ id: uuid, title: post.title, description: post.description });
    //error 발생시
    //setResult
    //등록한 이미지 삭제
    //return 시켜버림

    //쓴 글로 이동
  };

  const isVailidForm = (post: CreatePost) => {
    return true;
  };

  return { createPost, isVailidForm, result };
}
