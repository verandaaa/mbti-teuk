import Link from "next/link";
import Auth from "@/components/Auth";
import Image from "next/image";

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
      <div className="w-1/5">
        <Link href="/" aria-label="홈" className="flex gap-x-2">
          <Image src="/icon/logo.png" width={24} height={24} alt="logo" />
          <span className="sm:block hidden">MBTI특</span>
        </Link>
      </div>
      <div className="w-3/5">
        <ul className="flex justify-center gap-4 sm:gap-20">
          {menu.map(({ href, title }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end w-1/5">
        <Auth />
      </div>
    </div>
  );
}
