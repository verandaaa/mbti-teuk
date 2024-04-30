export type SignupUser = {
  email: string;
  mbti: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

export type SigninUser = {
  email: string;
  password: string;
};

export type GetUser = {
  userId: string;
  mbti: string;
  nickname: string;
};

export type UserComponentType = "navbar" | "post" | "comment";
