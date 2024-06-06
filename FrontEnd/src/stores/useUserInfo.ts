import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    userInfo: {
        username: string | null;
        email: string | null;
    };
    getInfo: (info: { username: string; email: string }) => void;
    clearInfo: () => void;
}


const useUserInfo = create(
    persist<UserStore>(
        (set) => ({
            userInfo: {
                username: null,
                email: null
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
                    email: null
                }})
            }
        }),
        {
            name: "userInfo"
        }
    )
)

export default useUserInfo;