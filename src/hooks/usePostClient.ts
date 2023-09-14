import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Result } from "@/model/result";
import { useState } from "react";
import { CreatePost } from "@/model/post";

export default function usePostClient() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [result, setResult] = useState<Result>();
  const mbtiList: string[] = require("/public/data/mbti_list.json");

  const createPost = async (post: CreatePost) => {};

  const isVailidForm = (post: CreatePost) => {
    return true;
  };

  return { createPost, isVailidForm, result };
}
