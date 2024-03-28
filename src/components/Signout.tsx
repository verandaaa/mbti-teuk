"use client";

import userUserClient from "@/hooks/useUserClient";

export default function Signout() {
  const { handleSignOut } = userUserClient();

  return <span onClick={handleSignOut}>로그아웃</span>;
}
