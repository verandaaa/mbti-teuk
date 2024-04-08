import Signout from "@/components/Signout";
import MyPage from "@/components/MyPage";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function AuthModal({ setIsModalOpen }: Props) {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="top-0 left-0 fixed w-screen h-screen" onClick={closeModal}></div>
      <div className="top-[2.5rem] right-0 absolute flex flex-col gap-y-1 border-gray-300 bg-white shadow-md p-1 border rounded-xl w-48">
        <div onClick={closeModal} className="hover:bg-gray-200 p-2 rounded-lg w-full cursor-pointer">
          <MyPage />
        </div>
        <div onClick={closeModal} className="hover:bg-gray-200 p-2 rounded-lg w-full cursor-pointer">
          <Signout />
        </div>
      </div>
    </>
  );
}
