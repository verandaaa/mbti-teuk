"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { supabase } from "@/lib/supabase/supabase-client";

type AuthContextType = {
  user: UserInfo | undefined;
};
type UserInfo = {
  email: string;
  mbti: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser({
        email: data.session?.user.email!,
        mbti: data.session?.user.user_metadata.mbti,
      });
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
