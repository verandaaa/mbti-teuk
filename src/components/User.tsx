"use client";

import Link from "next/link";
import Signout from "@/components/Signout";
import { useEffect, useState } from "react";
import useUserClient from "@/hooks/useUserClient";
import { getUser } from "@/model/user";

export default function User() {
  const { getUser } = useUserClient();
  const [user, setUser] = useState<getUser>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUser();
      if (data) {
        setUser(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
    </>
  );
}
