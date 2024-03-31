"use client";

import { signout } from "@/service/userClient";
import { useRouter } from "next/navigation";

export default function Signout() {
  const router = useRouter();

  const handleSignoutButtonClick = async () => {
    const { error } = await signout();
    if (error) {
      return;
    }
    router.push("/list");
  };

  return <span onClick={handleSignoutButtonClick}>로그아웃</span>;
}
