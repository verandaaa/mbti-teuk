export type getPost = {
  category: string;
  id: string;
  title: string;
  description: string;
};

export type getDetailPost = getPost & {
  userId: string;
  options: Option[];
};

export type CreatePost = {
  category: string;
  title: string;
  description: string;
  options: Option[];
};

type Option = {
  text: string;
  image?: File;
};

export type getCategory = {
  id: number;
  name: string;
};
