import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPosts } from "../api/getPosts";
import useUserInfo from "../stores/useUserInfo";
import { Heart } from "../icons/hearth"   


const Home = () => {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["post"],
        queryFn: fetchPosts
    })

    const userInfo = useUserInfo((state) => state.userInfo)
    const isUserInfoAvailable = userInfo.username !== null && userInfo.email !== null;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserInfoAvailable) {
            navigate("/signup");
        }
    }, [isUserInfoAvailable, navigate]);

    const addLike = () => {
        return null
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return ( 
        <div className="sad-container sad-m-auto sad-flex sad-flex-col sad-rounded-lg sad-px-64 sad-py-10 sad-bg-bg">
            <h1 className="sad-text-text">Total of {data.posts.length} posts</h1>
            {data.posts?.map((post : any, index : number) => {
                return (
                    <div className="sad-mb-10 sad-py-5 sad-px-8 sad-border-b-2 sad-border-bgAcc" key={index}>
                        <p>{post.username}</p>
                        <p>{post.email}</p>
                        <p>{post.content}</p>
                        <div className="sad-flex sad-items-center sad-gap-2">
                            <Heart stroke="#a0a0a0" className="hover:sad-stroke-text sad-cursor-pointer sad-ease-in-out sad-duration-200" onClick={ addLike }/> 
                            <p className="">{post.likes}  </p>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Home;