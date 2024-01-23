export type getPost = Omit<getDetailPost, "author">;

export type getDetailPost = {
  id: string;
  title: string;
  description: string;
  author?: string;
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
