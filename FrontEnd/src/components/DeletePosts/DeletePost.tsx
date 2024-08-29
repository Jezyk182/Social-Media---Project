import Delete from "../../icons/delete";
import useUserInfo from "../../stores/useUserInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../api/deletePost";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { jwtDecode } from "jwt-decode";

interface props {
    postId: number;
}


const DeletePost: React.FC<props> = ({ postId }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout)
    const { email, username } = useUserInfo((state) => state.userInfo);


    const { mutate } = useMutation({
        mutationFn: (id: number) => deletePost({id, email, username}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post"] });
        },
    });


    const handleDeletePost = () => {
        const token = localStorage.getItem("accessToken")
        if(!token) {
            navigate("/login")
            return
        }

        const decodedToken : any = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
            logout()
            navigate("/login")
            return
        }
        

        mutate(postId)
    };

    
    return (
        <Delete
            stroke="#a0a0a0"
            className="hover:sad-fill-text sad-cursor-pointer sad-ease-in-out sad-duration-200"
            onClick={handleDeletePost} // Corrected function call
        />
    );
};

export default DeletePost;
