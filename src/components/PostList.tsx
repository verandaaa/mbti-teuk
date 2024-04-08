"use client";

import { getPostList } from "@/service/postClient";
import { useEffect, useState } from "react";
import { GetPost } from "@/model/post";
import { useRouter } from "next/navigation";
import { MdOutlineHowToVote } from "react-icons/md";

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
  const categoryColors = require("/public/data/category_colors.json");

  return (
    <>
      {posts?.map((post, index) => (
        <div
          className="flex justify-between items-center gap-4 shadow-md my-6 px-8 py-4 border border-black cursor-pointer"
          key={index}
          onClick={() => handlePostClick(post.id)}
        >
          <div className="flex items-center gap-x-8">
            <span className={`${categoryColors[post.categoryId]} px-2 py-1 border border-black rounded-xl text-sm`}>
              {post.categoryName}
            </span>
            <span>{post.title}</span>
          </div>
          <div className="flex items-center gap-x-4">
            <MdOutlineHowToVote className={post.selectedOptionId ? "black" : "text-green-500"} size={18} />
            <span>{post.participateCount}</span>
          </div>
        </div>
      ))}
    </>
  );
}
