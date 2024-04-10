"use client";

import useCreateParticipate from "@/hooks/useCreateParticipate";
import { GetOption } from "@/model/post";
import { calculatePercentage } from "@/util/percent";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import AnonymousSignin from "@/components/AnonymousSignin";

type Props = {
  options: GetOption[];
  postId: string;
  selectedOptionId: number | null;
};

export default function OptionList({ options, postId, selectedOptionId }: Props) {
  const { mutation } = useCreateParticipate();
  const [percentages, setPercentages] = useState<number[]>([]);
  const percentageWidths = require("/public/data/percentage_widths.json");
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const percentages = calculatePercentage(options);
    setPercentages(percentages);
  }, [options]);

  const hanldeOptionClick = (optionId: number) => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    if (selectedOptionId === null) {
      mutation.mutate({ optionId, postId });
    }
  };

  const optionImageVariants = {
    withImage: "flex border rounded my-3 h-32",
    withoutImage: "flex border rounded my-3 h-10",
  };
  const optionBorderVariants = {
    selected: "border-2 border-option-blue",
    default: "border-2 border-gray-400",
  };
  const optionTextVariants = {
    selected: "text-option-blue",
    default: "text-gray-700",
  };

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div
            className={`${option.imageId ? optionImageVariants["withImage"] : optionImageVariants["withoutImage"]} ${
              selectedOptionId === option.id ? optionBorderVariants["selected"] : optionBorderVariants["default"]
            } cursor-pointer`}
            onClick={() => hanldeOptionClick(option.id)}
            key={index}
          >
            {option.imageId && (
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/images/${postId}/${option.imageId}.jpg`}
                alt="option-image"
                className="aspect-square object-cover"
              />
            )}
            <div
              className={`relative flex items-center w-full ${
                selectedOptionId === option.id ? optionTextVariants["selected"] : optionTextVariants["default"]
              }`}
            >
              {selectedOptionId && (
                <div
                  className={`top-0 left-0 absolute bg-option-sky ${percentageWidths[percentages[index]]} h-full`}
                ></div>
              )}
              <span className="left-4 absolute">{option.value}</span>
              {selectedOptionId && <span className="right-4 absolute">{percentages[index]}%</span>}
            </div>
          </div>
        );
      })}
      {isModalOpen && <AnonymousSignin setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
