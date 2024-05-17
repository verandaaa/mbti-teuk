import { create } from "zustand";
import { GetUser } from "@/model/user";

type UserStore = {
  user: GetUser | null;
  setUser: (session: any) => void;
  removeUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (session) =>
    set({
      user: {
        userId: session.user.id,
        mbti: session.user.user_metadata.mbti,
        nickname: session.user.user_metadata.nickname,
      },
    }),
  removeUser: () => set({ user: null }),
}));

export default useUserStore;
