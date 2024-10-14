import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    userInfo: {
        username: string | null;
        email: string | null;
        bio: string | null;
        pfp: number
    };
    getInfo: (info: { username: string; email: string, bio: string | null, pfp: number }) => void;
    clearInfo: () => void;
    patchInfo: (nr: number, bio: string | null) => void;
}


const useUserInfo = create(
    persist<UserStore>(
        (set) => ({
            userInfo: {
                username: null,
                email: null,
                bio: null,
                pfp: 0
            },
            getInfo: async (info) => {
                const userLocalStorage = localStorage.getItem('accessToken');
                if (userLocalStorage) {
                    set({ userInfo: info });
                } else {
                    console.warn("User is not Logged In!")
                }
            },
            clearInfo: () => {
                set({ userInfo: {
                    username: null,
                    email: null,
                    bio: null,
                    pfp: 0
                }})
            },
            patchInfo: (nr, bio) => {
                set((state) => ({
                    userInfo: {
                        ...state.userInfo, // Spread existing userInfo state
                        bio,
                        pfp: nr, // Only update the pfp field
                    },
                }));
            },
        }),
        {
            name: "userInfo"
        }
    )
)

export default useUserInfo;