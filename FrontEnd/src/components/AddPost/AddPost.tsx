import AddPostForm from "./AddPostForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../../stores/useAuthStore";
import EditPostForm from "../EditPosts/EditPostForm";


interface props {
    forEdit: boolean;
}

const AddPost: React.FC<props> = ({forEdit}) => {

    const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout)


    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(!token) {
            navigate("/login")
            return
        }

        const decodedToken : any = jwtDecode(token)
        const currentTime = Date.now() / 1000
        console.log(decodedToken.exp)
        console.log(currentTime)

        if (decodedToken.exp < currentTime) {
            logout()
            navigate("/login")
            return
        }
    }, [])
    
    return ( 
        <div className="sad-mx-auto sad-bg-opacity-40 sad-backdrop-blur-sm sad-bg-slate-600 sad-w-fit sad-p-10 sad-rounded-xl sad-mt-40  sad-shadow-2xl sad-shadow-black">
            <h1 className="sad-text-3xl sad-mb-6 sad-font-bold">{forEdit ? <p>Edit Post</p> : <p>Add Post</p>}</h1>
            {forEdit ? <EditPostForm /> : <AddPostForm />}
        </div>
    );
}
 
export default AddPost