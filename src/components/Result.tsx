"use client";

import { useEffect, useState } from "react";
import { GetParticipateResult, GetOption, MainClass } from "@/model/post";
import Chart from "@/components/Chart";
import { queryGetParticipateResult } from "@/util/postQuery";

type Props = {
  postId: string;
  options: GetOption[];
  isShow: boolean;
};

export default function Result({ postId, options, isShow }: Props) {
  const [specificResults, setSpecificResults] = useState<GetParticipateResult[]>();
  const [mainClass, setMainClass] = useState<MainClass>("optionId");
  const [subClass, setSubClass] = useState<string>();
  const mbtiList: string[] = require("/public/data/mbti_list.json");
  const { data: allResults } = queryGetParticipateResult(postId);

  useEffect(() => {
    setSpecificResults(allResults?.filter((result) => result[mainClass] == subClass));
  }, [subClass]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;

    setSubClass(value);
  };

  const handleMainClassClick = (mainClass: MainClass) => {
    setMainClass(mainClass);
  };

  return (
    isShow && (
      <div>
        <div>투표결과</div>
        <div onClick={() => handleMainClassClick("optionId")}>선택지별</div>
        <div onClick={() => handleMainClassClick("mbti")}>MBTI별</div>

        {mainClass === "optionId" && (
          <select onChange={handleChange}>
            <option value="default">나의 선택</option>
            {options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        )}
        {mainClass === "mbti" && (
          <select onChange={handleChange}>
            <option value="default">mbti 선택</option>
            {mbtiList.map((mbti, index) => (
              <option key={index} value={mbti}>
                {mbti}
              </option>
            ))}
          </select>
        )}
        {specificResults && <Chart data={specificResults} mainClass={mainClass === "mbti" ? "optionId" : "mbti"} />}
      </div>
    )
  );
}
