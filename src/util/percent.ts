import { GetOption } from "@/model/post";

export function calculatePercentage(options: GetOption[]) {
  let sum = options.reduce((acc, cur) => acc + cur.participateCount, 0);
  if (sum === 0) {
    return options.map(() => 0);
  }
  return options.map((v) => Math.floor((v.participateCount / sum) * 100));
}
