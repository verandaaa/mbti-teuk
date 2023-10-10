export type getPost = Omit<getDetailPost, "author">;

export type getDetailPost = {
  id: string;
  title: string;
  description: string;
  author: string;
};

export type CreatePost = {
  category: string;
  title: string;
  description: string;
  mainImage: File | undefined;
  options: Option[];
};

type Option = {
  text: string;
  image: File | undefined;
};
