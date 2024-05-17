"use client";

import useUserStore from "@/store/user";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthSubscriber() {
  const supabase = createClient();

  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (session) {
          setUser(session);
        }
      } else if (event === "SIGNED_IN") {
        setUser(session);
      } else if (event === "SIGNED_OUT") {
        removeUser();
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return <></>;
}
