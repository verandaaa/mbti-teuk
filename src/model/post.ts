export type getPost = {
  categoryName: string;
  id: string;
  title: string;
  description: string;
};

export type getDetailPost = getPost & {
  userId: string;
  options: Option[];
};

export type CreatePost = {
  categoryId: number;
  title: string;
  description: string;
  options: Option[];
};

export type Option = {
  value: string;
  image?: File;
  imageId?: string;
};

export type getCategory = {
  id: number;
  name: string;
};
