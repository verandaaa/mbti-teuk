import { CreatePost } from "@/model/post";
import { Status } from "@/model/status";
import { SigninUser, SignupUser } from "@/model/user";
import { Dispatch, SetStateAction } from "react";

export function handlePostChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setPost: Dispatch<SetStateAction<CreatePost>>,
  index?: number
) {
  const { name, value } = e.target;
  const files = (e.target as HTMLInputElement).files;
  const file = files ? files[0] : undefined;

  switch (name) {
    case "optionValue": {
      setPost((post) => ({
        ...post,
        options: post.options.map((option, i) => (i === index ? { ...option, value: value } : option)),
      }));
      break;
    }
    case "optionFile": {
      setPost((post) => ({
        ...post,
        options: post.options.map((option, i) => (i === index ? { ...option, image: file } : option)),
      }));
      break;
    }
    default: {
      setPost((post) => ({ ...post, [name]: value }));
    }
  }
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
  return true;
}

export function isValidUserForm(user: SignupUser | SigninUser) {
  const mbtiList: string[] = require("/public/data/mbti_list.json");

  if (!user.email.match(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
    return new Error("올바른 이메일 형식을 입력하세요.");
  }
  if ("mbti" in user && !mbtiList.includes(user.mbti)) {
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
