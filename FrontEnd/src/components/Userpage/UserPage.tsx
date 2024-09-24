import useUserInfo from "../../stores/useUserInfo";
import prof from "../../../public/prof_default.png"
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserPosts } from "../../api/getUserPosts";
import Post from "../Post/Post";

const UserPage = () => {
    const { username, email } = useUserInfo((state) => state.userInfo);
    console.log(username, email)

    const image = prof

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["post"],
        queryFn: () => fetchUserPosts({username, email})
    })

    console.log(data)

    const navigate = useNavigate();
    const isUserInfoAvailable = username !== null && email !== null;

    useEffect(() => {
        if (!isUserInfoAvailable) {
            navigate("/login");
        }
    }, [isUserInfoAvailable, navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return ( 
        <div className="sad-container sad-mx-auto sad-flex sad-pt-24">
            <div className="sad-w-1/3 sad-text-left sad-flex sad-flex-col sad-justify-start sad-items-start sad-gap-10">
                <div className=" sad-sticky sad-top-24">
                    <img src={image} alt="Avatar Image" className="sad-w-1/2" />
                    <div className="sad-w-1/2 sad-mt-4">
                        <h1 className="sad-text-3xl sad-font-bold sad-text-center sad-w-full">{username}</h1>
                        <p className="sad-mt-6">Your BIO here</p>
                    </div>
                </div>
            </div>
            <div className="sad-w-1/2">
                <h1 className="sad-text-4xl ">Your Posts</h1>
                <div className="sad-mt-4">
                    {data.posts?.map((post : any, index : number) => {
                    return ( (post.username === username && post.email === email) ? (
                            <Post username={ post.username } email={ post.email } content={ post.content } postid={ post.postid } key={index} date={post.date} edited={post.edited}/>
                        ) : null )
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default UserPage;