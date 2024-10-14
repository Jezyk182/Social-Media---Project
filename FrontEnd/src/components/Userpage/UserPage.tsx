import useUserInfo from "../../stores/useUserInfo";
import useAuthStore from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUserInfo } from "../../api/editUserInfo";
import UserPosts from "./UserPosts";
import { useMutation } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jwtDecode } from "jwt-decode";
import clsx from "clsx";

import prof0 from "/pfps/prof_default.png";
import prof1 from "/pfps/prof_0.png";
import prof2 from "/pfps/prof_1.png";
import prof3 from "/pfps/prof_2.png";
import prof4 from "/pfps/prof_3.png";
import prof5 from "/pfps/prof_4.png";
import prof6 from "/pfps/prof_5.png";
import prof7 from "/pfps/prof_6.png";
import prof8 from "/pfps/prof_7.png";
import prof9 from "/pfps/prof_8.png";


interface Inputs {
    bio: string | null
}



const UserPage = () => {
    const { username, email, pfp, bio } = useUserInfo((state) => state.userInfo);
    const patchInfo = useUserInfo((state) => state.patchInfo);
    const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout)
    const [imageIndex, setImageIndex] = useState<number>(0)
    const imagesToChoose = [prof0, prof1, prof2, prof3, prof4, prof5, prof6, prof7, prof8, prof9];
    const isUserInfoAvailable = username !== null && email !== null;
    const [hasChanged, setHasChanged] = useState(false)

    const { error, isError, mutate } = useMutation({
        mutationFn: ({ email, username, bio, pfp }: { email: string | null, username: string | null, bio: string | null, pfp: number }) => 
            editUserInfo(email, username, bio, pfp),
        onSuccess: (data: any) => {
            if(data.success) {
                navigate("/user")
            } else {
                navigate("/")
            }
        },
        onError: (err) => {
            console.error('Error submitting post data:', err);
            return err
        }
    })

    const schema = z.object({
        bio: z.string().max(64),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        defaultValues: {
          bio: `${bio}`
        },
        resolver: zodResolver(schema)
    })


    useEffect(() => {
        if (!isUserInfoAvailable) {
            navigate("/login");
        }
        
        setImageIndex(pfp != null ? pfp : 0)

    }, [isUserInfoAvailable, navigate, pfp]);

    const onSubmitt = (data: Inputs) => {
        const token = localStorage.getItem("accessToken")

        if(!token) {
            navigate("/login")
            console.log("Dont have token")
            return
        }

        const decodedToken : any = jwtDecode(token)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
            logout()
            navigate("/login")
            console.log("Token Expired")
            return
        }

        patchInfo(imageIndex, data.bio)

        mutate({
            bio: data.bio, 
            email,
            username, 
            pfp: imageIndex 
        });

        setHasChanged(false)
    }

    const handleBioChange = (e: any) => {
        const value = e.target.value
        setHasChanged(value !== bio)
    }

    const handlePfpChange = (e: any) => {
        const value = e.target.value
        setHasChanged(value === bio)
    }

    return (
        <div className="sad-container sad-mx-auto sad-flex sad-pt-24">
            <div className="sad-w-1/3 sad-text-left sad-flex sad-flex-col sad-justify-start sad-items-start sad-gap-10">
                <div className=" sad-sticky sad-top-24">
                    <div className="sad-flex flex-">
                        <img
                            src={imagesToChoose[imageIndex]}
                            alt="Uploaded avatar image"
                            className="sad-w-72 sad-h-72 sad-aspect-square sad-rounded-full sad-object-cover"
                        />
                        <div className="sad-overflow-y-scroll sad-h-72">
                            {imagesToChoose.map((img, id) => (
                                <img src={img} alt={`Avatar Image ${id}`} key={id} loading="lazy" className="sad-w-16 sad-cursor-pointer sad-rounded-full" onClick={() => {
                                    setImageIndex(id)
                                    setHasChanged(pfp !== id)
                                }}/>
                            ))}
                        </div>
                    </div>
                    <div className="sad-w-full sad-mt-4">
                        <h1 className="sad-text-3xl sad-font-bold sad-text-center sad-w-full">{username}</h1>
                        <form action="POST" className="sad-w-full" onSubmit={handleSubmit(onSubmitt)}>
                            <p className="sad-mt-6">Your BIO here</p>
                            <textarea 
                            { ...register("bio") }

                            className={clsx(
                                'sad-mt-3 sad-block sad-w-full sad-resize-none sad-rounded-lg sad-border-none sad-bg-white/5 sad-py-1.5 sad-px-3 sad-text-lg sad-text-white sad-shadow-2xl sad-shadow-black',
                                'focus:sad-outline-none data-[focus]:sad-outline-2 data-[focus]:sad-outline-offset-2 data-[focus]:sad-outline-white/25'
                            )}
                            rows={3}
                            cols={40}
                            onChange={handleBioChange}
                            />
                            <button disabled = {!hasChanged} className="sad-mt-10 sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-900 sad-w-fit sad-bg-blue-500 sad-font-bold sad-shadow-lg sad-shadow-black hover:sad-bg-blue-600 sad-duration-150 disabled:sad-bg-red-500 disabled:sad-cursor-not-allowed">Save</button>
                            {errors.bio && <span className="sad-text-red-500">{errors.bio.message}</span>}
                            {isError && <span className="sad-text-red-500">{(error as any)?.message || 'Error submitting form data'}</span>}
                        </form>
                    </div>
                </div>
            </div>
            <div className="sad-w-1/2">
                <h1 className="sad-text-4xl ">Your Posts</h1>
                <div className="sad-mt-4">
                    <UserPosts />
                </div>
            </div>
        </div>
    );
};

export default UserPage;
