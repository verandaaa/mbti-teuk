"use client";

import Link from "next/link";

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
  return (
    <div>
      <Link href="/" aria-label="홈">
        <h1>MBTI특</h1>
      </Link>
      <ul>
        {menu.map(({ href, title }) => (
          <li key={href}>
            <Link href={href} aria-label={title}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/signin" aria-label="로그인">
        로그인
      </Link>
    </div>
  );
}
