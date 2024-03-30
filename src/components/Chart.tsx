import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GetParticipateResult, MainClass } from "@/model/post";

type Props = {
  data: GetParticipateResult[];
  mainClass: MainClass;
};

export default function Chart({ data, mainClass }: Props) {
  return (
    <ResponsiveContainer width="100%" height={data.length * 35 + 70}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical" barSize={30}>
        <CartesianGrid strokeDasharray="0" horizontal={false} />
        <XAxis type="number" allowDecimals={false} />
        <YAxis type="category" dataKey={mainClass} />
        <Tooltip formatter={(value) => [value, "투표자 수"]} />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
