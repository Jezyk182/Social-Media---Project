import Edit from "../icons/edit";
import useUserInfo from "../stores/useUserInfo";


interface params {
    postEmail: string;
    postUsername: string;
}

const EditPost: React.FC<params> = ({ postEmail, postUsername }) => {
    const { email, username } = useUserInfo((state) => state.userInfo) 

    const edit = () => {
        console.log(email, username)
        console.log(postEmail, postUsername)

        if(email === postEmail && username === postUsername) {
            return
        }
    }


    return ( 
        <div>
            <Edit fill="#a0a0a0" className="hover:sad-fill-text sad-cursor-pointer sad-ease-in-out sad-duration-200" onClick={ edit }/>
        </div>
     );
}
 
export default EditPost;