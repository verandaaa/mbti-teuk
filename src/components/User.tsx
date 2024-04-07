type Props = {
  user: {
    mbti: string;
    nickname: string;
  };
};

export default function User({ user }: Props) {
  const mbtiColors = require("/public/data/mbti_colors.json");

  return (
    <div className="flex items-center gap-x-1.5">
      <span className={`${mbtiColors[user.mbti]} px-2 py-0.5 text-sm`}>{user.mbti} </span>
      <span>{user.nickname}</span>
    </div>
  );
}
