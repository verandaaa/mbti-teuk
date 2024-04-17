"use client";

import { useState, useEffect, useRef } from "react";
import StatusView from "@/components/common/StatusView";
import { CreatePost } from "@/model/post";
import { getCategoryList } from "@/service/postClient";
import { GetCategory } from "@/model/post";
import { useChangePostForm } from "@/hooks/useChangeForm";
import Button from "@/components/common/Button";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { useMutationCreatePost } from "@/hooks/usePostMutation";
import { v4 as uuidv4 } from "uuid";
import { Status } from "@/model/status";
import { useValidPostForm } from "@/hooks/useValidForm";
import LoadingModal from "@/components/modal/LoadingModal";

export default function NewPost() {
  const [post, setPost] = useState<CreatePost>({
    id: uuidv4(),
    categoryId: 0,
    title: "",
    description: "",
    options: [
      { value: "", image: null },
      { value: "", image: null },
    ],
  });
  const [categories, setCategories] = useState<GetCategory[]>();
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [imageSrcs, setImageSrcs] = useState<(string | null)[]>(new Array(2).fill(null));
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

  const handleAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!vaildPostForm(post, "add")) return;

    handlePostChange(e, setPost, setImageSrcs);
  };

  const handleSubtractButtonClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (!vaildPostForm(post, "subtract")) return;

    handlePostChange(e, setPost, setImageSrcs, index);
    fileRefs.current.splice(index, 1);
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
                src={imageSrcs[index]!}
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
            <Button
              type="button"
              name="subtract"
              style="minus"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubtractButtonClick(e, index)}
            >
              −
            </Button>
          </div>
        ))}
        <Button type="button" name="add" style="plus" onClick={handleAddButtonClick}>
          +
        </Button>
        <Button style="default">작성완료</Button>
        <StatusView status={status} />
      </form>
      {mutation.isPending && <LoadingModal />}
    </>
  );
}
