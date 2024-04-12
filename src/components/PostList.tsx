"use client";

import { MdOutlineHowToVote } from "react-icons/md";
import { queryGetPostList } from "@/hooks/usePostQuery";
import Link from "next/link";

export default function PostList() {
  const { data: posts } = queryGetPostList();
  const categoryColors = require("/public/data/category_colors.json");

  return (
    <>
      {posts?.map((post, index) => (
        <Link
          className="flex justify-between items-center gap-4 shadow-md my-6 px-8 py-4 border border-black cursor-pointer"
          key={index}
          href={`/list/${post.id}`}
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
        </Link>
      ))}
    </>
  );
}
