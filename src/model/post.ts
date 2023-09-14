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
