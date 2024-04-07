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
        <div className="flex gap-x-2">
          <User user={user} />
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
