import { CreatePost } from "@/model/post";
import { SigninUser, SignupUser } from "@/model/user";

export function isValidPostForm(post: CreatePost, optionButtonParam?: string) {
  console.log(optionButtonParam);
  if (post.options.length === 2 && optionButtonParam === "subtract") {
    throw new Error("보기는 2개 이상 10개 이하여야 합니다.");
  }
  if (post.options.length === 10 && optionButtonParam === "add") {
    throw new Error("보기는 2개 이상 10개 이하여야 합니다.");
  }
  if (optionButtonParam) {
    return;
  }
  if (post.categoryId === 0) {
    throw new Error("카테고리를 선택해주세요.");
  }
  if (post.title.length === 0 || post.title.length > 50) {
    throw new Error("제목은 1자 이상 50자 이하여야 합니다.");
  }
  for (let i = 0; i < post.options.length; i++) {
    const value = post.options[i].value;
    if (value.length === 0 || value.length > 30) {
      throw new Error(i + 1 + "번째 보기는 1자 이상 30자 이하여야 합니다.");
    }
  }
}

export function isValidUserForm(user: SignupUser | SigninUser) {
  if (!user.email.match(/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
    throw new Error("올바른 이메일 형식을 입력하세요.");
  }
  if ("mbti" in user && user.mbti.length === 0) {
    throw new Error("MBTI를 선택해주세요.");
  }
  if (user.password.length < 6) {
    throw new Error("비밀번호는 최소 6글자 이상입니다.");
  }
  if ("passwordCheck" in user && user.password !== user.passwordCheck) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }
}
