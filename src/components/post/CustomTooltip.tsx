import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { MainClass } from "@/model/post";

type Props = TooltipProps<ValueType, NameType> & { mainClass: MainClass };

export default function CustomTooltip({ active, payload, label, mainClass }: Props) {
  if (active && payload && payload.length) {
    return (
      <div className="border-gray-400 bg-white p-2 border">
        <p>
          {mainClass === "optionId" ? payload[0].payload.value : payload[0].payload.mbti} : {payload[0].value}명
        </p>
      </div>
    );
  }

  return null;
}
