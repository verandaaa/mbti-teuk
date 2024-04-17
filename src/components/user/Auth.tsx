"use client";

import Link from "next/link";
import Signout from "@/components/user/Signout";
import { useAuthContext } from "@/context/AuthContext";
import User from "@/components/user/User";

export default function Auth() {
  const { user } = useAuthContext();

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
