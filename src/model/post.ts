export type GetPost = {
  categoryName: string;
  id: string;
  title: string;
  description: string;
};

export type GetDetailPost = GetPost & {
  userId: string;
  options: GetOption[];
  createdAt: string;
  viewCount: number;
  userNickname: string;
  userMbti: string;
  categoryId: number;
  selectedOptionId: number | null;
};

export type CreatePost = {
  categoryId: number;
  title: string;
  description: string;
  options: CreateOption[];
};

export type CreateOption = {
  value: string;
  image?: File;
};

export type GetOption = {
  id: number;
  value: string;
  imageId: string | null;
  postId: string;
};

export type GetCategory = {
  id: number;
  name: string;
};

export type GetParticipateResult = {
  optionId: number;
  mbti: string;
  count: number;
};

export type MainClass = "optionId" | "mbti";
