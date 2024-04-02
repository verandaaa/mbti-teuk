import { CreatePost } from "@/model/post";
import { Status } from "@/model/status";
import { SigninUser, SignupUser } from "@/model/user";
import { Dispatch, SetStateAction } from "react";

export function handlePostChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setPost: Dispatch<SetStateAction<CreatePost>>,
  setImageSrcs: Dispatch<SetStateAction<string[]>>,
  index?: number
) {
  const { name, value } = e.target;

  switch (name) {
    case "optionValue": {
      setPost((post) => ({
        ...post,
        options: post.options.map((option, i) => (i === index ? { ...option, value: value } : option)),
      }));
      break;
    }
    case "optionFile": {
      const files = (e.target as HTMLInputElement).files;
      const file = files ? files[0] : undefined;
      setPost((post) => ({
        ...post,
        options: post.options.map((option, i) => (i === index ? { ...option, image: file } : option)),
      }));
      if (file && typeof index === "number") {
        handleFileChange(file, setImageSrcs, index);
      }
      break;
    }
    default: {
      setPost((post) => ({ ...post, [name]: value }));
    }
  }
}

export function handleFileChange(file: File, setImageSrcs: Dispatch<SetStateAction<string[]>>, index: number) {
  const reader = new FileReader();
  reader.onload = () => {
    setImageSrcs((prevState) => {
      const newImageSrcs = [...prevState];
      newImageSrcs[index] = reader.result as string;
      return newImageSrcs;
    });
  };
  reader.readAsDataURL(file);
}

export function handleSigninChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setUser: Dispatch<SetStateAction<SigninUser>>
) {
  const { name, value } = e.target;
  setUser((user) => ({ ...user, [name]: value }));
}

export function handleSignupChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setUser: Dispatch<SetStateAction<SignupUser>>
) {
  const { name, value } = e.target;
  setUser((user) => ({ ...user, [name]: value }));
}

export function isValidPostForm(post: CreatePost) {
  if (post.categoryId === 0) {
    return new Error("카테고리를 선택해주세요.");
  }
  if (post.title.length === 0 || post.title.length > 30) {
    return new Error("제목은 1자 이상 30자 이하여야 합니다.");
  }
  if (post.options.length < 2 || post.options.length > 10) {
    return new Error("보기는 2개 이상 10개 이하여야 합니다.");
  }
  for (let i = 0; i < post.options.length; i++) {
    const value = post.options[i].value;
    if (value.length === 0 || value.length > 20) {
      return new Error(i + 1 + "번째 보기는 1자 이상 20자 이하여야 합니다.");
    }
  }
}

export function isValidUserForm(user: SignupUser | SigninUser) {
  if (!user.email.match(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
    return new Error("올바른 이메일 형식을 입력하세요.");
  }
  if ("mbti" in user && user.mbti.length === 0) {
    return new Error("MBTI를 선택해주세요.");
  }
  if (user.password.length < 6) {
    return new Error("비밀번호는 최소 6글자 이상입니다.");
  }
  if ("passwordCheck" in user && user.password !== user.passwordCheck) {
    return new Error("비밀번호가 일치하지 않습니다.");
  }
  return null;
}
