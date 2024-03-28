"use client";

import { useState, useEffect } from "react";
import StatusView from "@/components/StatusView";
import { CreatePost } from "@/model/post";
import usePostClient from "@/hooks/usePostClient";
import { getCategory } from "@/model/post";
import useFormControl from "@/hooks/useFormControl";
import { useStatusContext } from "@/context/StatusContext";

export default function NewPost() {
  const [post, setPost] = useState<CreatePost>({
    categoryId: 0,
    title: "",
    description: "",
    options: [
      { value: "", image: undefined },
      { value: "", image: undefined },
    ],
  });
  const { createPost, getCategoryList } = usePostClient();
  const [categories, setCategories] = useState<getCategory[]>();
  const { handlePostChange, isValidPostForm } = useFormControl();
  const { status, setStatus } = useStatusContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoryList();
      if (data) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    handlePostChange(e, setPost, index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidPostForm(post)) {
      createPost(post);
    }
  };

  const formClassName = "border border-black rounded p-2";

  return (
    <form className="max-w-4xl mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
      <select name="categoryId" onChange={handleChange} className={formClassName}>
        <option value="default">카테고리 선택</option>
        {categories?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="title"
        value={post.title}
        placeholder="투표 제목을 입력하세요."
        onChange={handleChange}
        className={formClassName}
      />
      <textarea
        name="description"
        value={post.description}
        placeholder="추가 설명을 입력하세요."
        onChange={handleChange}
        className={formClassName}
        rows={5}
      />
      {post.options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            name="optionValue"
            value={option.value}
            placeholder={"보기 " + (index + 1)}
            onChange={(e) => handleChange(e, index)}
            className={formClassName}
          />
          <input type="file" name="optionFile" accept="image/*" onChange={(e) => handleChange(e, index)} />
        </div>
      ))}
      <button className={formClassName + ` bg-button text-white`}>작성완료</button>
      <StatusView status={status} />
    </form>
  );
}
