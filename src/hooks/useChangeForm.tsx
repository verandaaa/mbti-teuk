import { CreatePost } from "@/model/post";
import { SigninUser, SignupUser } from "@/model/user";
import { Dispatch, SetStateAction } from "react";

export function useChangePostForm() {
  const handlePostChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>,
    setPost: Dispatch<SetStateAction<CreatePost>>,
    setImageSrcs: Dispatch<SetStateAction<string[]>>,
    index?: number
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;

    switch (name) {
      case "optionValue": {
        setPost((post) => ({
          ...post,
          options: post.options.map((option, i) => (i === index ? { ...option, value: value } : option)),
        }));
        break;
      }
      case "optionFile": {
        const files = (e.target as HTMLInputElement).files;
        const file = files ? files[0] : undefined;
        setPost((post) => ({
          ...post,
          options: post.options.map((option, i) => (i === index ? { ...option, image: file } : option)),
        }));
        if (file && typeof index === "number") {
          handleFileChange(file, setImageSrcs, index);
        }
        break;
      }
      case "add": {
        setPost((post) => ({ ...post, options: [...post.options, { value: "", image: undefined }] }));
        break;
      }
      case "subtract": {
        setPost((post) => ({
          ...post,
          options: post.options.filter((_, i) => i !== index),
        }));
        setImageSrcs((prevSrcs) => prevSrcs.filter((_, idx) => idx !== index));
        break;
      }
      default: {
        setPost((post) => ({ ...post, [name]: value }));
      }
    }
  };

  const handleFileChange = (file: File, setImageSrcs: Dispatch<SetStateAction<string[]>>, index: number) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrcs((prevState) => {
        const newImageSrcs = [...prevState];
        newImageSrcs[index] = reader.result as string;
        return newImageSrcs;
      });
    };
    reader.readAsDataURL(file);
  };

  return { handlePostChange };
}

export function useChangeUserForm() {
  const handleSigninChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setUser: Dispatch<SetStateAction<SigninUser>>
  ) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSignupChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setUser: Dispatch<SetStateAction<SignupUser>>
  ) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  return { handleSigninChange, handleSignupChange };
}
