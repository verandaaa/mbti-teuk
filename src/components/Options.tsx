"use client";

import useCreateParticipate from "@/hooks/useCreateParticipate";
import { GetOption } from "@/model/post";

type Props = {
  options: GetOption[];
  postId: string;
  selectedOptionId: number | null;
};

export default function Options({ options, postId, selectedOptionId }: Props) {
  const { mutation } = useCreateParticipate();

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div
            className={
              "flex border rounded my-2 h-32" +
              (selectedOptionId === option.id ? " border-blue-700" : " border-gray-400")
            }
            onClick={() => {
              if (selectedOptionId === null) {
                mutation.mutate({ optionId: option.id, postId });
              }
            }}
            key={index}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/images/${postId}/${option.imageId}.jpg`}
              alt="option-image"
              className="aspect-square object-cover"
            />
            <div className="flex items-center mx-4">{option.value}</div>
          </div>
        );
      })}
    </div>
  );
}
