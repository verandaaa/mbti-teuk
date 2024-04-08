import AuthModal from "@/components/AuthModal";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";

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
    <div className="relative flex items-center">
      <div className="lg:block hidden cursor-pointer" onClick={openModal}>
        <div className="flex items-center gap-x-1.5">
          <span className={`${mbtiColors[user.mbti]} px-2 py-0.5 text-sm`}>{user.mbti} </span>
          <span>{user.nickname}</span>
        </div>
      </div>
      <div className="lg:hidden cursor-pointer" onClick={openModal}>
        <FaRegUser className={`${mbtiColors[user.mbti]} rounded-lg`} size={22} />
      </div>
      {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
