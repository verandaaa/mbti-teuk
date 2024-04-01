"use client";

import { getPostList } from "@/service/postClient";
import { useEffect, useState } from "react";
import { GetPost } from "@/model/post";
import { useRouter } from "next/navigation";

export default function PostList() {
  const [posts, setPosts] = useState<GetPost[]>();
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

  const handlePostClick = (postId: string) => {
    router.push(`/list/${postId}`);
  };

  return (
    <>
      {posts?.map((post, index) => (
        <div className="flex" key={index} onClick={() => handlePostClick(post.id)}>
          <div>{post.categoryName}</div>
          <div>{post.title}</div>
          <div>{post.participateCount}</div>
        </div>
      ))}
    </>
  );
}
