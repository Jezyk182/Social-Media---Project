import { HeartIconBlank , HeartIconFilled} from "../../icons/hearth";
import { useState, useEffect } from "react";
import useUserInfo from "../../stores/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { fetchLikes } from "../../api/likes/getLikes";

interface props {
    postId: number;
}


const LikeCount: React.FC<props> = ({postId}) => {
    const { email, username } = useUserInfo((state) => state.userInfo);
    const [likes, likesAmount] = useState(0)
    const [liked, hasLiked] = useState(false)

    const { data, isError, isLoading } = useQuery({
        queryKey: ["likes", postId],
        queryFn: () => fetchLikes({id: postId, email, username})
    })

    function increaseLikes() {
        likesAmount(likes * 1 + 1)
    }

    useEffect(() => {
        if (data && data.likes) {
            likesAmount(data.likes[0]?.count || 0);
        }
    }, [data])
    
    if (isLoading) return null;
    if (isError || !data || !data.likes) return <p>Error loading likes</p>;
    

    return ( 
        <>
            <HeartIconBlank stroke="#a0a0a0" className="hover:sad-stroke-text sad-cursor-pointer sad-ease-in-out sad-duration-200 sad-mt-2" onClick={ () => increaseLikes() }/>
            <p>{ likes }</p>
        </>
     );
}
 
export default LikeCount;