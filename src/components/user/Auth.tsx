"use client";

import Link from "next/link";
import User from "@/components/user/User";
import useUserStore from "@/store/user";

export default function Auth() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {user ? (
        <User user={user} componentType="navbar" />
      ) : (
        <Link href="/signin" aria-label="로그인">
          로그인
        </Link>
      )}
    </>
  );
}
