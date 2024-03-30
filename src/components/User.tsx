"use client";

import Link from "next/link";
import Signout from "@/components/Signout";
import { useAuthContext } from "@/context/AuthContext";

export default function User() {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <div>
          <span>
            {user.mbti} {user.nickname}
          </span>
          <Signout />
        </div>
      ) : (
        <Link href="/signin" aria-label="로그인">
          로그인
        </Link>
      )}
    </>
  );
}
