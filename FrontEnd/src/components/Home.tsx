import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchPosts } from "../api/getPosts";
import useUserInfo from "../stores/useUserInfo";
import Post from "./Post/Post";


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
            navigate("/login");
        }
    }, [isUserInfoAvailable, navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return ( 
        <div className="sad-container sad-m-auto sad-flex sad-flex-col sad-rounded-lg sad-px-64 sad-py-10 sad-bg-bg">
            <h1 className="sad-text-text">Total of {data.posts.length} posts</h1>
            {data.posts?.map((post : any, index : number) => {
                console.log(post.date)
                return (
                    <Post username={ post.username } email={ post.email } content={ post.content } postid={ post.postid } key={index} date={post.date}/>
                )
            })}
        </div>
     );
}
 
export default Home;