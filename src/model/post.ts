export type getPost = {
  categoryName: string;
  id: string;
  title: string;
  description: string;
};

export type getDetailPost = getPost & {
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

export type getCategory = {
  id: number;
  name: string;
};

export type getParticipateResult = {
  optionId: number;
  mbti: string;
  count: number;
};

export type MainClass = "optionId" | "mbti";
