import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchPosts } from "../api";
import useUserInfo from "../stores/useUserInfo";


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

    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return ( 
        <div className="sad-container sad-m-auto sad-flex sad-flex-col sad-backdrop-blur-sm sad-bg-opacity-40 sad-rounded-lg sad-px-64 sad-py-10">
            <h1 className="sad-text-white">Total of {data.posts.length} posts</h1>
            {data.posts?.map((post : any, index : number) => {
                return (
                    <div className="sad-border" key={index}>
                        <p>{post.username}</p>
                        <p>{post.email}</p>
                        <p>{post.content}</p>
                        <p>{post.likes}</p>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Home;