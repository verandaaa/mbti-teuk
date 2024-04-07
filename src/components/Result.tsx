"use client";

import { useEffect, useState } from "react";
import { GetParticipateResult, GetOption, MainClass } from "@/model/post";
import Chart from "@/components/Chart";
import { queryGetParticipateResult } from "@/util/postQuery";
import { convertResult } from "@/util/result";

type Props = {
  postId: string;
  options: GetOption[];
  selectedOptionId: string;
  userMbti: string;
};

export default function Result({ postId, options, selectedOptionId, userMbti }: Props) {
  const [specificResults, setSpecificResults] = useState<GetParticipateResult[]>();
  const [mainClass, setMainClass] = useState<MainClass>("optionId");
  const [subClass, setSubClass] = useState<string>(selectedOptionId);
  const mbtiList: string[] = require("/public/data/mbti_list.json");
  const { data: allResults, isLoading } = queryGetParticipateResult(postId);

  useEffect(() => {
    if (!isLoading && allResults) {
      setSpecificResults(convertResult(allResults, mainClass, subClass, options));
    }
  }, [isLoading, subClass]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setSubClass(value);
  };

  const handleMainClassClick = (mainClass: MainClass) => {
    setMainClass(mainClass);
    if (mainClass === "optionId") {
      setSubClass(selectedOptionId);
    } else {
      setSubClass(userMbti);
    }
  };

  const mainClassVariants = {
    selected: "border-white p-2 border-b text-option-blue",
    default: "border-black p-2 border-b",
  };

  return (
    <div>
      <div className="relative my-4">
        <div className="flex justify-around w-full absoulute">
          <div
            className="bg-white border-t border-r border-black border-l rounded-t-xl w-[40%] text-center cursor-pointer"
            onClick={() => handleMainClassClick("optionId")}
          >
            <div className={mainClassVariants[mainClass === "optionId" ? "selected" : "default"]}>선택지별</div>
          </div>
          <div
            className="bg-white border-t border-r border-black border-l rounded-t-xl w-[40%] text-center cursor-pointer"
            onClick={() => handleMainClassClick("mbti")}
          >
            <div className={mainClassVariants[mainClass === "mbti" ? "selected" : "default"]}>MBTI별</div>
          </div>
        </div>
        <div className="bottom-0 left-0 -z-10 absolute border-b border-black w-full"></div>
      </div>

      {mainClass === "optionId" && (
        <select onChange={handleChange} className="w-full cursor-pointer el-primary">
          <option value={selectedOptionId}>나의 선택</option>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
      )}
      {mainClass === "mbti" && (
        <select onChange={handleChange} className="w-full cursor-pointer el-primary">
          <option value={userMbti}>나의 MBTI</option>
          {mbtiList.map((mbti, index) => (
            <option key={index} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
      )}
      {specificResults && <Chart data={specificResults} mainClass={mainClass === "mbti" ? "optionId" : "mbti"} />}
    </div>
  );
}
