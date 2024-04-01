import { createClient } from "@/lib/supabase/client";
import { GetPost, CreatePost, GetCategory, GetParticipateResult, GetDetailPost } from "@/model/post";
import { v4 as uuidv4 } from "uuid";

export async function getPostList(): Promise<GetPost[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("postView").select();

  return data;
}

export async function getCategoryList(): Promise<GetCategory[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select();

  return data;
}

export async function createPost(post: CreatePost) {
  const supabase = createClient();
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
}

export async function deletePost(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
}

export async function createParticipate(id: number, postId: string) {
  const supabase = createClient();
  const {} = await supabase.from("participates").insert({
    optionId: id,
    postId,
  });
}

export async function getParticipateResult(postId: string): Promise<GetParticipateResult[] | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("participateView")
    .select("optionId,mbti,count")
    .eq("postId", postId)
    .order("count", { ascending: false });

  return data;
}

export async function getPost(postId: string): Promise<GetDetailPost | null> {
  const supabase = createClient();
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
}
