import Heart from "../../icons/hearth";
import EditPost from "../editPost";
import DeletePost from "../DeletePosts/DeletePost";
import useUserInfo from "../../stores/useUserInfo";


interface postData {
    username: string;
    email: string;
    content: string;
    postid: number;
    index: number;
}

const Post: React.FC<postData> = (props) => {
    const userInfo = useUserInfo((state) => state.userInfo)

    const addLike = () => {
        console.log("liked")
    }

    return (
        <div className="sad-mb-10 sad-py-5 sad-px-8 sad-border-b-2 sad-border-bgAcc" key={props.index}>
            <p>{props.username}</p>
            <p>{props.email}</p>
            <p>{props.content}</p>
            <div className="sad-flex sad-items-center sad-justify-between">
                <div className="sad-flex sad-items-center sad-gap-2">
                    <Heart stroke="#a0a0a0" className="hover:sad-stroke-text sad-cursor-pointer sad-ease-in-out sad-duration-200 sad-mt-2" onClick={ () => addLike() }/> 
                    <p className=""> 0 </p>
                </div>
                <div className="sad-flex sad-items-center sad-gap-2">
                    { userInfo.email === props.email && userInfo.username === props.username 
                    ?<>
                        <EditPost postEmail={ props.email } postUsername={ props.username } /> 
                        <DeletePost postId={ props.postid }/>
                     </>
                    : null }
                    
                </div>
            </div>
        </div>
    )
}
 
export default Post;