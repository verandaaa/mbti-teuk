"use client";

import { signout } from "@/service/userClient";
import { useRouter } from "next/navigation";

type Props = {
  closeModal: () => void;
};

export default function Signout({ closeModal }: Props) {
  const router = useRouter();

  const handleSignoutButtonClick = async () => {
    closeModal();
    const { error } = await signout();
    if (error) {
      return;
    }
    router.refresh();
  };

  return (
    <span className="hover:bg-gray-200 p-2 rounded-lg w-full cursor-pointer" onClick={handleSignoutButtonClick}>
      로그아웃
    </span>
  );
}
