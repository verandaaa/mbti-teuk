export type GetPost = {
  categoryName: string;
  categoryId: number;
  id: string;
  title: string;
  participateCount: number;
};

export type GetDetailPost = GetPost & {
  description: string;
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
  participateCount: number;
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
