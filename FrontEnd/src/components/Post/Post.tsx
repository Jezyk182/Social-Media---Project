import HeartIcon from "../../icons/hearth";
import EditPost from "../EditPosts/EditPost";
import DeletePost from "../DeletePosts/DeletePost";
import useUserInfo from "../../stores/useUserInfo";


interface postData {
    username: string;
    email: string;
    content: string;
    postid: number;
    date: string;
    edited: boolean;
}

const Post: React.FC<postData> = (props) => {
    const userInfo = useUserInfo((state) => state.userInfo)
    const utcDate = new Date(props.date);
    const postDate = utcDate.toLocaleDateString();

    const addLike = () => {
        console.log("liked")
    }

    return (
        <div className="sad-mb-10 sad-py-5 sad-px-8 sad-border-b-2 sad-border-bgAcc">
            <p>{props.username}</p>
            <p>{props.email}</p>
            <p>{props.content}</p>
            <div className="sad-flex sad-items-center sad-justify-between">
                <div className="sad-flex sad-items-center sad-gap-2">
                    <HeartIcon stroke="#a0a0a0" className="hover:sad-stroke-text sad-cursor-pointer sad-ease-in-out sad-duration-200 sad-mt-2" onClick={ () => addLike() }/> 
                    <p className=""> 0 </p>
                </div>
                <div className="sad-flex sad-items-center sad-gap-2">
                    { userInfo.email === props.email && userInfo.username === props.username 
                    ?<>
                        <EditPost postEmail={ props.email } postUsername={ props.username } postContent={ props.content } postId={ props.postid }/> 
                        <DeletePost postId={ props.postid } />
                     </>
                    : null }
                    
                </div>
            </div>
            <p className="sad-text-gray-500 sad-mt-2 -sad-mb-2">{ props.edited ? "Edited" : "Published" } at: { postDate }</p>
        </div>
    )
}
 
export default Post;