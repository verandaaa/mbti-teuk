import AuthModal from "@/components/modal/AuthModal";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { UserComponentType } from "@/model/user";

type Props = {
  user: {
    mbti: string;
    nickname: string;
  };
  componentType: UserComponentType;
};

export default function User({ user, componentType }: Props) {
  const mbtiColors = require("/public/data/mbti_colors.json");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    if (componentType === "navbar") {
      setIsModalOpen(true);
    }
  };

  const cursorVariants = {
    navbar: "cursor-pointer",
    post: "",
  };

  return (
    <div className="relative flex items-center">
      <div className={`lg:block hidden ${cursorVariants[componentType]}`} onClick={openModal}>
        <div className="flex items-center gap-x-1.5">
          <span className={`${mbtiColors[user.mbti]} px-2 py-0.5 text-sm`}>{user.mbti} </span>
          <span>{user.nickname}</span>
        </div>
      </div>
      <div className={`lg:hidden ${cursorVariants[componentType]}`} onClick={openModal}>
        <FaRegUser className={`${mbtiColors[user.mbti]} rounded-lg`} size={22} />
      </div>
      {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
