import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Description, Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'
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
            navigate("/login")
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


    return ( 
        <div className="sad-mx-auto sad-min-w-96">
            <form method="post" onSubmit={handleSubmit} className="sad-flex sad-flex-col">
                <Field>
                    <Label className="sad-text-lg sad-font-medium sad-text-white">Post Content</Label>
                    <Description className="sad-text-lg sad-text-white/50">Share with us any of yours experience</Description>
                    <Textarea
                    className={clsx(
                        'sad-mt-3 sad-block sad-w-full sad-resize-none sad-rounded-lg sad-border-none sad-bg-white/5 sad-py-1.5 sad-px-3 sad-text-lg sad-text-white',
                        'focus:sad-outline-none data-[focus]:sad-outline-2 data-[focus]:sad-outline-offset-2 data-[focus]:sad-outline-white/25'
                    )}
                    rows={5}
                    cols={50}
                    />
                </Field>
                <button className="sad-mt-5 sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-800 sad-w-fit sad-bg-blue-500 sad-font-bold">Add Post</button>
            </form>
        </div>
     );
}
 
export default AddPostForm;