import Link from "next/link";
import Auth from "@/components/Auth";

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
      <Auth />
    </div>
  );
}
