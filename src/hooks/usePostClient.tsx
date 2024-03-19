import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Result } from "@/model/result";
import { useState } from "react";
import { getPost, CreatePost, getCategory, getParticipateResult } from "@/model/post";
import { v4 as uuidv4 } from "uuid";

export default function usePostClient() {
  const supabase = createClientComponentClient();
  const [result, setResult] = useState<Result>();

  const getPostList = async (): Promise<getPost[] | null> => {
    const { data, error } = await supabase.from("posts").select();

    return data;
  };

  const getCategoryList = async (): Promise<getCategory[] | null> => {
    const { data, error } = await supabase.from("categories").select();

    return data;
  };

  const createPost = async (post: CreatePost) => {
    const postId = uuidv4();

    const {} = await supabase.from("posts").insert({
      id: postId,
      title: post.title,
      description: post.description,
      categoryId: post.categoryId,
    });

    for (let i = 0; i < post.options.length; i++) {
      const optionId = uuidv4();

      const {} = await supabase
        .from("options")
        .insert({ value: post.options[i].value, postId: postId, imageId: optionId });

      const image = post.options[i].image;
      if (!image) {
        continue;
      }
      const {} = await supabase.storage.from("images").upload(`${postId}/${optionId}.jpg`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    }
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
  };

  const isVailidForm = (post: CreatePost) => {
    return true;
  };

  const createParticipate = async (id: number, postId: string) => {
    const {} = await supabase.from("participates").insert({
      optionId: id,
      postId,
    });
  };

  const getParticipateResult = async (postId: string): Promise<getParticipateResult[] | null> => {
    const { data } = await supabase.from("participateView").select("optionId,mbti,count").eq("postId", postId);

    return data;
  };

  return {
    getPostList,
    createPost,
    deletePost,
    getCategoryList,
    isVailidForm,
    createParticipate,
    getParticipateResult,
    result,
  };
}
