"use client";

import { MdOutlineHowToVote } from "react-icons/md";
import { useQueryGetPostList } from "@/hooks/usePostQuery";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostList() {
  const { posts, fetchNextPage } = useQueryGetPostList();
  const categoryColors = require("/public/data/category_colors.json");
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {posts?.map((group, index) => (
        <Fragment key={index}>
          {group?.map((post) => (
            <Link
              className="flex justify-between items-center gap-4 shadow-md my-6 px-8 py-4 border border-black cursor-pointer"
              key={post.id}
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
        </Fragment>
      ))}
      <div ref={ref}></div>
    </>
  );
}
