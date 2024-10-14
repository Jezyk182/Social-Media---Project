import { useEffect } from "react";
import useUserInfo from "../stores/useUserInfo";

const getPfp = () => {

    const { pfp } = useUserInfo((state) => state.userInfo);

    useEffect(() => {
        // Handle preview generation for browsers
        if (pfp instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
            };
            reader.readAsDataURL(pfp); // Convert the file to base64
        } else {
        }
    }, [pfp]);


    return ( 
        null
    );
}
 
export default getPfp;