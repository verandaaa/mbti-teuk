"use client";

import usePostClient from "@/hooks/usePostClient";
import { useEffect, useState } from "react";
import { getParticipateResult, GetOption } from "@/model/post";

type Props = {
  postId: string;
  options: GetOption[];
};

type Option = "optionId" | "mbti";

export default function Graph({ postId, options }: Props) {
  const { getParticipateResult } = usePostClient();
  const [allResults, setAllResults] = useState<getParticipateResult[]>();
  const [specificResults, setSpecificResults] = useState<getParticipateResult[]>();
  const [option1, setOption1] = useState<Option>("optionId");
  const [option2, setOption2] = useState<string>();
  const mbtiList: string[] = require("/public/data/mbti_list.json");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getParticipateResult(postId);
      if (data) {
        setAllResults(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSpecificResults(allResults?.filter((result) => result[option1] == option2));
  }, [option2]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;

    setOption2(value);
  };

  return (
    <div>
      <div>투표결과</div>
      <div onClick={() => setOption1("optionId")}>선택지별</div>
      <div onClick={() => setOption1("mbti")}>MBTI별</div>
      {specificResults?.map((specificResult, index) => {
        return (
          <div key={index}>
            <span>{specificResult.optionId}</span>
            &nbsp;
            <span>{specificResult.mbti}</span>
            &nbsp;
            <span>{specificResult.count}</span>
          </div>
        );
      })}
      {option1 === "optionId" && (
        <select onChange={handleChange}>
          <option value="default">나의 선택</option>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
      )}
      {option1 === "mbti" && (
        <select onChange={handleChange}>
          <option value="default">mbti 선택</option>
          {mbtiList.map((mbti, index) => (
            <option key={index} value={mbti}>
              {mbti}
            </option>
          ))}
        </select>
      )}
      {option2}
    </div>
  );
}
