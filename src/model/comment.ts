export type CreateComment = {
  text: string;
  postId: string;
};

export type GetComment = {
  id: number;
  text: string;
  userNickname: string;
  userMbti: string;
  createdAt: string;
};
