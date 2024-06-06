import useAuthStore from "../../stores/useAuthStore";
import useUserInfo from "../../stores/useUserInfo";


const LogOut = () => {

    const logout = useAuthStore((state) => state.logout)
    const clearInfo = useUserInfo((state) => state.clearInfo)
    function handleLogOut() {
        console.log('logged out')
        logout()
        clearInfo()
    }

    return ( 
        <button onClick={handleLogOut} className="sad-w-full sad-text-left">Sign Out</button>
     );
}
 
export default LogOut;