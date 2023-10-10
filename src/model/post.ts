export type getPost = {
  id: string;
  title: string;
  description: string;
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
