import Link from "next/link";
import Signout from "@/components/Signout";
import useUserServer from "@/hooks/useUserServer";

const menu = [
  {
    href: "/list",
    title: "목록",
  },
  {
    href: "/new",
    title: "만들기",
  },
  {
    href: "/intro",
    title: "소개",
  },
];

export default async function Navbar() {
  const { getUser } = useUserServer();
  const user = await getUser();

  return (
    <div className="flex justify-between py-4">
      <Link href="/" aria-label="홈">
        <h1>MBTI특</h1>
      </Link>
      <ul className="flex gap-20">
        {menu.map(({ href, title }) => (
          <li key={href}>
            <Link href={href} aria-label={title}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      {user ? (
        <div>
          <span>{user.mbti}</span>
          <Signout />
        </div>
      ) : (
        <Link href="/signin" aria-label="로그인">
          로그인
        </Link>
      )}
    </div>
  );
}
