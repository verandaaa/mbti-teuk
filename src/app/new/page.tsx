"use client";

import { useState } from "react";
import ResultView from "@/components/ResultView";
import { CreatePost } from "@/model/post";
import usePostClient from "@/hooks/usePostClient";

export default function NewPage() {
  const [post, setPost] = useState<CreatePost>({
    category: "",
    title: "",
    description: "",
    mainImage: undefined,
    options: [
      { text: "", image: undefined },
      { text: "", image: undefined },
    ],
  });
  const { createPost, isVailidForm, result } = usePostClient();
  const genreList: string[] = require("/public/data/genre_list.json");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "optionText") {
      setPost((post) => ({
        ...post,
        options: post.options.map((option, i) =>
          i === index ? { text: value, image: option.image } : option
        ),
      }));
    } //
    else {
      setPost((post) => ({ ...post, [name]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target?.files;
    if (files && files[0]) {
      setPost((post) => ({
        ...post,
        options: post.options.map((option, i) =>
          i === index ? { text: option.text, image: files[0] } : option
        ),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(post);

    if (!isVailidForm(post)) {
      return;
    }

    createPost(post);
  };

  const formClassName = "border border-black rounded p-2";

  return (
    <form
      className="max-w-4xl mx-auto flex flex-col gap-6 my-16"
      onSubmit={handleSubmit}
    >
      <select name="category" onChange={handleChange} className={formClassName}>
        <option value="default">카테고리 선택</option>
        {genreList.map((mbti, index) => (
          <option key={index} value={mbti}>
            {mbti}
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
            name="optionText"
            value={option.text}
            placeholder={"보기 " + (index + 1)}
            onChange={(e) => handleChange(e, index)}
            className={formClassName}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, index)}
          />
        </div>
      ))}
      <button className={formClassName + ` bg-button text-white`}>
        작성완료
      </button>
      <ResultView result={result} />
    </form>
  );
}
