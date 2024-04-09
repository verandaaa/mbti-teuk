"use client";

import { useAuthContext } from "@/context/AuthContext";
import { signinAnonymously } from "@/service/userClient";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function AnonymousSignin({ setIsModalOpen }: Props) {
  const { user } = useAuthContext();
  const [mbti, setMbti] = useState<string>();
  const mbtiList: string[] = require("/public/data/mbti_list.json");

  useEffect(() => {
    const fetchData = async () => {
      if (user || !mbti) {
        return;
      }
      const { error } = await signinAnonymously(mbti);
    };
    fetchData();
  }, [mbti]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMbti(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* <div className="top-0 left-0 fixed w-screen h-screen" onClick={closeModal}></div> */}
      <div className="top-0 left-0 fixed bg-blue-300">
        <div>당신의 MBTI는?</div>
        <select name="mbti" onChange={handleChange} className="el-primary">
          <option value="">mbti 선택</option>
          {mbtiList.map((mbti, index) => (
            <option key={index} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
