import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin, signup, signout, signinAnonymously } from "@/service/userClient";
import { SigninUser, SignupUser } from "@/model/user";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Status } from "@/model/status";
import { handleSigninError, handleSignupError } from "@/util/error";

export function useMutationSignin(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<void, Error, { user: SigninUser }>({
    mutationFn: ({ user }) => signin(user),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.back();
      router.refresh();
    },
    onError: (error) => {
      setStatus(handleSigninError(error));
    },
  });

  return { mutation };
}

export function useMutationSigninAnonymously() {
  const mutation = useMutation<void, Error, { mbti: string }>({
    mutationFn: ({ mbti }) => signinAnonymously(mbti),
  });

  return { mutation };
}

export function useMutationSignup(setStatus: Dispatch<SetStateAction<Status | undefined>>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<void, Error, { user: SignupUser }>({
    mutationFn: ({ user }) => signup(user),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.back();
      router.refresh();
    },
    onError: (error) => {
      setStatus(handleSignupError(error));
    },
  });

  return { mutation };
}

export function useMutationSignout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<void, Error>({
    mutationFn: () => signout(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.refresh();
    },
  });

  return { mutation };
}
