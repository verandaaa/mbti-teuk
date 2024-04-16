"use client";

import { useAuthContext } from "@/context/AuthContext";
import { signinAnonymously } from "@/service/userClient";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import SelectMbti from "@/components/post/SelectMbti";

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function SelectSigninModal({ setIsModalOpen }: Props) {
  const router = useRouter();
  const [isSelectMbtiOpen, setIsSelectMbtiOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailSigninClick = () => {
    closeModal();
    router.push("/signin");
  };

  const handleAnonymousSigninClick = () => {
    setIsSelectMbtiOpen(true);
  };

  const menus = [
    {
      icon: MdAlternateEmail,
      key: "이메일",
      name: "이메일로 로그인",
      description: "글쓰기, 투표, 댓글, 마이페이지 가능",
      onclick: handleEmailSigninClick,
    },
    {
      icon: FaQuestion,
      key: "익명",
      name: "익명으로 로그인",
      description: "투표, 댓글 가능",
      onclick: handleAnonymousSigninClick,
    },
  ];

  return (
    <div className="relative">
      <div className="top-0 left-0 fixed bg-black opacity-50 w-screen h-screen" onClick={closeModal}></div>
      <div className="top-1/2 left-1/2 fixed flex flex-col gap-4 bg-white p-4 rounded-md w-1/2 max-w-md transform -translate-x-1/2 -translate-y-1/2">
        {!isSelectMbtiOpen ? (
          <>
            {menus.map((menu) => {
              return (
                <div
                  className="flex items-center gap-x-5 hover:border-option-blue p-5 border border-black rounded-md cursor-pointer"
                  onClick={menu.onclick}
                  key={menu.key}
                >
                  <menu.icon className="p-1 border border-black rounded-md" size={28} />
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-lg">{menu.name}</span>
                    <span className="">{menu.description}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <SelectMbti setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
}
