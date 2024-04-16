"use client";

import { Dispatch, SetStateAction } from "react";
import { useMutationSigninAnonymously } from "@/hooks/useUserMutation";

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function SelectMbti({ setIsModalOpen }: Props) {
  const mbtiList: string[] = require("/public/data/mbti_list.json");
  const mbtiColors = require("/public/data/mbti_colors.json");
  const { mutation } = useMutationSigninAnonymously();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMbtiButtonClick = async (mbti: string) => {
    mutation.mutate({ mbti });
    closeModal();
  };

  return (
    <>
      <div className="font-bold text-center text-xl">당신의 MBTI는?</div>
      <div className="gap-2 sm:gap-5 grid grid-cols-4">
        {mbtiList.map((mbti) => {
          return (
            <button
              type="button"
              className={`flex justify-center items-center ${mbtiColors[mbti]} aspect-square rounded-md hover:border-gray-700 hover:border-2 cursor-pointer text-xs sm:text-lg lg:text-2xl`}
              onClick={() => handleMbtiButtonClick(mbti)}
              key={mbti}
            >
              {mbti}
            </button>
          );
        })}
      </div>
    </>
  );
}
