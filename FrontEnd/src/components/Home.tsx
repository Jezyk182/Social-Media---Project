import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api";


const Home = () => {
    axios.defaults.withCredentials = true

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["post"],
        queryFn: fetchPosts
    })
   

    return ( 
        <div className="sad-container sad-m-auto sad-flex sad-flex-col sad-backdrop-blur-sm sad-bg-opacity-40 sad-rounded-lg sad-px-64 sad-py-10">
            <h1 className="sad-text-white">Total of {data.posts.length} posts.</h1>
            {data.posts?.map((post : any) => {
                return (
                    <div className="sad-border">
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