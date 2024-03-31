"use client";

import { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import { GetUser } from "@/model/user";
import { createClient } from "@/lib/supabase/client";

type AuthContextType = {
  user: GetUser | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<GetUser>();
  const supabase = createClient();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      if (event === "INITIAL_SESSION") {
        if (session) {
          setUser({
            userId: session.user.id,
            mbti: session.user.user_metadata.mbti,
            nickname: session.user.user_metadata.nickname,
          });
        }
      } else if (event === "SIGNED_IN") {
        if (session) {
          setUser({
            userId: session.user.id,
            mbti: session.user.user_metadata.mbti,
            nickname: session.user.user_metadata.nickname,
          });
        }
      } else if (event === "SIGNED_OUT") {
        setUser(undefined);
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

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
}
