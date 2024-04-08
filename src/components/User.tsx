import AuthModal from "@/components/AuthModal";
import { useState } from "react";

type Props = {
  user: {
    mbti: string;
    nickname: string;
  };
};

export default function User({ user }: Props) {
  const mbtiColors = require("/public/data/mbti_colors.json");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <div className="lg:block hidden">
        <div className="flex items-center gap-x-1.5 cursor-pointer" onClick={openModal}>
          <span className={`${mbtiColors[user.mbti]} px-2 py-0.5 text-sm`}>{user.mbti} </span>
          <span>{user.nickname}</span>
        </div>
      </div>
      <div className="lg:hidden">아이콘</div>
      {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
