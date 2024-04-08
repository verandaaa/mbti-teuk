"use client";

import Link from "next/link";
import Signout from "@/components/Signout";
import { useAuthContext } from "@/context/AuthContext";
import User from "@/components/User";

export default function Auth() {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        <User user={user} />
      ) : (
        <Link href="/signin" aria-label="로그인">
          로그인
        </Link>
      )}
    </>
  );
}
