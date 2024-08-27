import Delete from "../../icons/delete";

const DeletePost = () => {

    const deletePost = () => {
        return null
    }

    return ( 
        <Delete stroke="#a0a0a0" className="hover:sad-fill-text sad-cursor-pointer sad-ease-in-out sad-duration-200" onClick={ deletePost } />
     );
}
 
export default DeletePost;