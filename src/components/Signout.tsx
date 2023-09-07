"use client";

import { supabase } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";

export default function Signout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return <span onClick={handleSignOut}>로그아웃</span>;
}
