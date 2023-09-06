"use client";

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

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

export default function Navbar() {
  const { user } = useAuthContext();
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
          <span>로그아웃</span>
        </div>
      ) : (
        <Link href="/signin" aria-label="로그인">
          로그인
        </Link>
      )}
    </div>
  );
}
