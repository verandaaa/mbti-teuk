"use client";

import userUserClient from "@/hooks/useUserClient";

export default function Signout() {
  const { signout } = userUserClient();

  const handleSignoutButtonClick = () => {
    signout();
  };

  return <span onClick={handleSignoutButtonClick}>로그아웃</span>;
}
