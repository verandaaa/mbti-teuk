import { Status } from "@/model/status";
import { Dispatch, SetStateAction } from "react";
import { isValidPostForm } from "@/util/formControl";
import { CreatePost } from "@/model/post";
import useStatus from "@/hooks/useStatus";

export function useValidPostForm(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const { handleFormError } = useStatus();

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
