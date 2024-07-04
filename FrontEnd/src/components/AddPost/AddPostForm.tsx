import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../../stores/useAuthStore";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { newPost } from "../../api/newPost";


interface Inputs {
    content: string
}

const schema = z.object({
    content: z.string().nonempty("Post content is required!"),
})


const AddPostForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        defaultValues: {
          content: ""
        },
        resolver: zodResolver(schema)
    })

    const { data, error, isError, isSuccess, mutate } = useMutation({
        mutationFn: (data : Inputs) => newPost(data),
        onSuccess: (data : any) => {
            if(data.success) {
                navigate("/")
            } else {
                navigate("/login")
            }
        },
        onError: (err) => {
            console.error('Error submitting post data:', err);
            return err
        }
    })



    const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout)


    const onSubmit = (data : Inputs) => {
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

        mutate(data)
    }


    return ( 
        <div className="sad-mx-auto sad-min-w-96">
            <form method="post" onSubmit={handleSubmit(onSubmit)} className="sad-flex sad-flex-col">
                    <label className="sad-text-lg sad-font-medium sad-text-white">Post Content</label>
                    <p className="sad-text-lg sad-text-white/50">Share with us any of yours experience</p>
                    <textarea
                    { ...register("content", { required: "Please enter post content." }) }

                    className={clsx(
                        'sad-mt-3 sad-block sad-w-full sad-resize-none sad-rounded-lg sad-border-none sad-bg-white/5 sad-py-1.5 sad-px-3 sad-text-lg sad-text-white',
                        'focus:sad-outline-none data-[focus]:sad-outline-2 data-[focus]:sad-outline-offset-2 data-[focus]:sad-outline-white/25'
                    )}
                    rows={5}
                    cols={50}
                    />
                    {errors.content && <span className="sad-text-red-500">{errors.content.message}</span>}
                    {isError && <span className="sad-text-red-500">{(error as any)?.message || 'Error submitting form data'}</span>}
                <button className="sad-mt-5 sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-800 sad-w-fit sad-bg-blue-500 sad-font-bold">Add Post</button>
            </form>
        </div>
     );
}
 
export default AddPostForm;