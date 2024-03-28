import { CreatePost } from "@/model/post";
import { SigninUser, SignupUser } from "@/model/user";
import { Dispatch, SetStateAction } from "react";

export default function useFormControl() {
  const handlePostChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setPost: Dispatch<SetStateAction<CreatePost>>,
    index?: number
  ) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    const file = files ? files[0] : undefined;

    switch (name) {
      case "optionValue": {
        setPost((post) => ({
          ...post,
          options: post.options.map((option, i) => (i === index ? { ...option, value: value } : option)),
        }));
        break;
      }
      case "optionFile": {
        setPost((post) => ({
          ...post,
          options: post.options.map((option, i) => (i === index ? { ...option, image: file } : option)),
        }));
        break;
      }
      default: {
        setPost((post) => ({ ...post, [name]: value }));
      }
    }
  };

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

  return { handlePostChange, handleSigninChange, handleSignupChange };
}
