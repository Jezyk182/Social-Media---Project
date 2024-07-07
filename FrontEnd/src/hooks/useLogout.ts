import useAuthStore from "../stores/useAuthStore";
import useUserInfo from "../stores/useUserInfo";

const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const clearInfo = useUserInfo((state) => state.clearInfo);
    

    const handleLogout = () => {
        logout()
        clearInfo()
    }

    return handleLogout 
}
 
export default useLogout;