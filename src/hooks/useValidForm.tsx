import { Status } from "@/model/status";
import { Dispatch, SetStateAction } from "react";
import { isValidPostForm, isValidCommentForm, isValidUserForm } from "@/util/form";
import { CreatePost } from "@/model/post";
import { handleFormError } from "@/util/error";
import { SigninUser, SignupUser } from "@/model/user";
import { CreateComment } from "@/model/comment";

export function useValidPostForm(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const vaildPostForm = (post: CreatePost, optionButtonParam?: string) => {
    try {
      isValidPostForm(post, optionButtonParam);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setStatus(handleFormError(error));
      }
      return false;
    }
  };

  return { vaildPostForm };
}

export function useValidCommentForm(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const vaildCommentForm = (comment: CreateComment) => {
    try {
      isValidCommentForm(comment);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setStatus(handleFormError(error));
      }
      return false;
    }
  };

  return { vaildCommentForm };
}

export function useValidUserForm(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const vaildUserForm = (user: SignupUser | SigninUser) => {
    try {
      isValidUserForm(user);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setStatus(handleFormError(error));
      }
      return false;
    }
  };

  return { vaildUserForm };
}
