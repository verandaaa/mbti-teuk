"use client";

import usePostClient from "@/hooks/usePostClient";
import { useEffect, useState } from "react";
import { getPost } from "@/model/post";
import { useRouter } from "next/navigation";

export default function ListPage() {
  const { getPostList } = usePostClient();
  const [posts, setPosts] = useState<getPost[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostList();
      if (data) {
        setPosts(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {posts?.map((post, index) => (
        <div
          className="flex"
          key={index}
          onClick={() => router.push(`/list/${post.id}`)}
        >
          <div>{post.id}</div>
          <div>{post.title}</div>
          <div>{post.description}</div>
        </div>
      ))}
    </>
  );
}
