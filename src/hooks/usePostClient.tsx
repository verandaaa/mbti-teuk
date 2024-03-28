import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Status } from "@/model/status";
import { useState } from "react";
import { getPost, CreatePost, getCategory, getParticipateResult, getDetailPost } from "@/model/post";
import { v4 as uuidv4 } from "uuid";

export default function usePostClient() {
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState<Status>();
  const router = useRouter();

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
    router.push("/list");
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
    const { data } = await supabase
      .from("participateView")
      .select("optionId,mbti,count")
      .eq("postId", postId)
      .order("count", { ascending: false });

    return data;
  };

  const getPost = async (postId: string): Promise<getDetailPost | null> => {
    const { data, error } = await supabase
      .from("postView")
      .select("*,options(id,value,imageId)")
      .eq("id", postId)
      .returns<any[]>();

    if (data === null) {
      return null;
    }

    const post = data[0];

    return post;
  };

  return {
    getPostList,
    createPost,
    deletePost,
    getCategoryList,
    isVailidForm,
    createParticipate,
    getParticipateResult,
    getPost,
    status,
  };
}
