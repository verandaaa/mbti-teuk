"use client";

import { useState, useEffect, useRef } from "react";
import StatusView from "@/components/StatusView";
import { CreatePost } from "@/model/post";
import { getCategoryList } from "@/service/postClient";
import { GetCategory } from "@/model/post";
import { useChangePostForm } from "@/hooks/useChangeForm";
import Button from "@/components/Button";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { useMutationCreatePost } from "@/hooks/usePostMutation";
import { v4 as uuidv4 } from "uuid";
import { Status } from "@/model/status";
import { useValidPostForm } from "@/hooks/useValidForm";
import LoadingModal from "@/components/LoadingModal";

export default function NewPost() {
  const [post, setPost] = useState<CreatePost>({
    id: uuidv4(),
    categoryId: 0,
    title: "",
    description: "",
    options: [
      { value: "", image: undefined },
      { value: "", image: undefined },
    ],
  });
  const [categories, setCategories] = useState<GetCategory[]>();
  const fileRefs = useRef<null[] | HTMLInputElement[]>([]);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>();
  const { mutation } = useMutationCreatePost(setStatus);
  const { vaildPostForm } = useValidPostForm(setStatus);
  const { handlePostChange } = useChangePostForm();

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
    handlePostChange(e, setPost, setImageSrcs, index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!vaildPostForm(post)) return;
    mutation.mutate({ post });
  };

  const handleAddButtonClick = () => {
    if (!vaildPostForm(post, "add")) return;

    setPost((post) => ({ ...post, options: [...post.options, { value: "", image: undefined }] }));
  };

  const handleSubtractButtonClick = (index: number) => {
    if (!vaildPostForm(post, "subtract")) return;

    const newOptions = [...post.options.slice(0, index), ...post.options.slice(index + 1)];
    setPost((post) => ({
      ...post,
      options: newOptions,
    }));
  };

  const handlePreviewImageClick = (index: number) => {
    fileRefs.current[index]?.click();
  };

  return (
    <>
      <form className="flex flex-col gap-6 mx-auto max-w-4xl" onSubmit={handleSubmit}>
        <select name="categoryId" onChange={handleChange} className="el-primary">
          <option value="">카테고리 선택</option>
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
          className="el-primary"
        />
        <textarea
          name="description"
          value={post.description}
          placeholder="추가 설명을 입력하세요."
          onChange={handleChange}
          className="el-primary"
          rows={5}
        />
        {post.options.map((option, index) => (
          <div className="relative" key={index}>
            <input
              type="text"
              name="optionValue"
              value={option.value}
              placeholder={"보기 " + (index + 1)}
              onChange={(e) => handleChange(e, index)}
              className="w-full el-primary"
            />

            {imageSrcs[index] ? (
              <Image
                src={imageSrcs[index]}
                className="top-1/2 right-2 absolute transform -translate-y-1/2 cursor-pointer aspect-square object-cover"
                onClick={() => handlePreviewImageClick(index)}
                alt="option-image"
                width={32}
                height={32}
              />
            ) : (
              <CiImageOn
                className="top-1/2 right-2 absolute w-8 h-8 transform -translate-y-1/2 cursor-pointer aspect-square object-cover"
                onClick={() => handlePreviewImageClick(index)}
              />
            )}
            <input
              ref={(el) => {
                fileRefs.current[index] = el;
              }}
              className="hidden"
              type="file"
              name="optionFile"
              accept="image/*"
              onChange={(e) => handleChange(e, index)}
            />
            <Button type="button" style="minus" onClick={() => handleSubtractButtonClick(index)}>
              −
            </Button>
          </div>
        ))}
        <Button type="button" style="plus" onClick={handleAddButtonClick}>
          +
        </Button>
        <Button style="default">작성완료</Button>
        <StatusView status={status} />
      </form>
      {mutation.isPending && <LoadingModal />}
    </>
  );
}
