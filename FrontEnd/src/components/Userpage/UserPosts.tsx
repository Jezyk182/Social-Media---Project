import { fetchUserPosts } from "../../api/getUserPosts";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../stores/useUserInfo";
import Post from "../Post/Post";


const UserPosts = () => {
    const { username, email } = useUserInfo((state) => state.userInfo);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["post"],
        queryFn: () => fetchUserPosts({ username, email }),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return ( 
        <>
            {data.posts?.map((post: any, index: number) => (
                post.username === username && post.email === email ? (
                    <Post
                        username={post.username}
                        email={post.email}
                        content={post.content}
                        postid={post.postid}
                        key={index}
                        date={post.date}
                        edited={post.edited}
                    />
                ) : null
            ))}
        </>
     );
}
 
export default UserPosts;