import { HeartIconBlank, HeartIconFilled } from "../../icons/hearth";
import { useState, useEffect } from "react";
import useUserInfo from "../../stores/useUserInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLikes } from "../../api/likes/getLikes";
import { addLike } from "./addLike";
import { dislike } from "./dislike";

interface props {
    postId: number;
}

const LikePost: React.FC<props> = ({ postId }) => {
    const { email, username } = useUserInfo((state) => state.userInfo);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const queryClient = useQueryClient();


    const { data, isError, isLoading } = useQuery({
        queryKey: ["likes", postId],
        queryFn: () => fetchLikes({ id: postId, email, username }),
    });

    useEffect(() => {
        if (data) {
            setLikes(data.likes[0]?.count * 1);
            setLiked(data.liked);
        }
    }, [data]);

    function changeLikes() {
        if (liked) {
            setLikes((prevLikes) => prevLikes * 1 - 1);
            dislike(postId, email, username, queryClient)
            setLiked(false);
        } else {
            setLikes((prevLikes) => prevLikes * 1 + 1);
            addLike(postId, email, username, queryClient); // Pass email and username here
            setLiked(true);
        }
    }

    if (isLoading) return null;
    if (isError || !data) return <p>Error loading likes</p>;

    return (
        <>
            {liked ? (
                <HeartIconFilled
                    stroke="#a0a0a0"
                    className="hover:sad-stroke-text sad-cursor-pointer sad-ease-in-out sad-duration-200 sad-mt-2"
                    onClick={changeLikes}
                />
            ) : (
                <HeartIconBlank
                    stroke="#a0a0a0"
                    className="hover:sad-stroke-text sad-cursor-pointer sad-ease-in-out sad-duration-200 sad-mt-2"
                    onClick={changeLikes}
                />
            )}
            <p>{likes}</p>
        </>
    );
};

export default LikePost;
