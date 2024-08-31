import EditIcon from "../../icons/edit";
import useUserInfo from "../../stores/useUserInfo";
import { Link } from "react-router-dom";


interface props {
    postEmail: string;
    postUsername: string;
    postContent: string;
    postId: number;
}

const EditPost: React.FC<props> = ({ postEmail, postUsername, postContent, postId }) => {
    const { email, username } = useUserInfo((state) => state.userInfo) 

    const handleEditPost = () => {
        console.log(email, username)
        console.log(postEmail, postUsername)

        if(email === postEmail && username === postUsername) {
            return
        }
    }


    return ( 
        <div>
            <Link to={`/edit/${postId}`} state={{ prevContent: postContent }}>
                <EditIcon stroke="#a0a0a0" className="hover:sad-fill-text sad-cursor-pointer sad-ease-in-out sad-duration-200" onClick={ handleEditPost }/>
            </Link>
        </div>
     );
}
 
export default EditPost;