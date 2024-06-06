import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../../stores/useAuthStore";



const AddPostForm = () => {
    const [formData, setFormData] = useState({
        content: "",
    });
    const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout)

    function handleDataChange(e : any) {
        const value = e.target.value
        const name = e.target.name

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    axios.defaults.withCredentials = true

    async function handleSubmit(e : any) {
        e.preventDefault();

        const token = localStorage.getItem("accessToken")
        if(!token) {
            navigate("/login")
            return
        }

        const decodedToken : any = jwtDecode(token)
        const currentTime = Date.now() / 1000
        console.log(decodedToken)
        console.log(currentTime)
        if (decodedToken.exp < currentTime) {
            logout()
            navigate("login")
            return
        }


        try {
            console.log(formData)
            await axios.post('http://localhost:3000/api/addPost', formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                if(res.data.success) {
                    navigate("/")
                } else {
                    navigate("/login")
                }
            });
            // Handle success
            console.log('Form data submitted successfully');
            console.log(formData)
        } catch (error) {
            // Handle error
            console.error('Error submitting form data:', error);
        }
    }


    const labelClass = "sad-my-1 sad-text-xl sad-py-1 sad-px-3 sad-rounded sad-text-gray-200 sad-w-full sad-bg-transparent sad-border-gray-500 sad-border sad-shadow-sm sad-shadow-gray-800"

    return ( 
        <div className="sad-mx-auto sad-w-full">
            <form method="post" onSubmit={handleSubmit} className="sad-flex sad-flex-col">
                        <label htmlFor="content" className="sad-mb-8">
                            <p>Post Content</p>
                            <textarea value={formData.content} placeholder="One day, I..." name="content" onChange={handleDataChange} className={labelClass} rows={5} cols={50} required />
                        </label>
                <button className="sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-800 sad-w-fit sad-bg-blue-500 sad-font-bold">Add Post</button>
            </form>
        </div>
     );
}
 
export default AddPostForm;