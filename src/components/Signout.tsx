"use client";

import { signout } from "@/service/userClient";
import { useRouter } from "next/navigation";

export default function Signout() {
  const router = useRouter();

  const handleSignoutButtonClick = () => {
    signout().then((res) => {
      if (res.type === "success") {
        router.push("/list");
      }
    });
  };

  return <span onClick={handleSignoutButtonClick}>로그아웃</span>;
}
