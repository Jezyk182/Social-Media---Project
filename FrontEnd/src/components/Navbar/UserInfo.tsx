import useUserInfo from "../../stores/useUserInfo";
import DropDown from "./DropDown";

const UserInfo = () => {

    const userInfo = useUserInfo((state) => state.userInfo)

    console.log(userInfo)

    return ( 
        <DropDown />
     );
}
 
export default UserInfo;