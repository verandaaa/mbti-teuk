"use client";

import { useMutationSignout } from "@/query/useUserMutation";

type Props = {
  closeModal: () => void;
};

export default function Signout({ closeModal }: Props) {
  const { mutation } = useMutationSignout();

  const handleSignoutButtonClick = async () => {
    closeModal();
    mutation.mutate();
  };

  return (
    <span className="hover:bg-gray-200 p-2 rounded-lg w-full cursor-pointer" onClick={handleSignoutButtonClick}>
      로그아웃
    </span>
  );
}
