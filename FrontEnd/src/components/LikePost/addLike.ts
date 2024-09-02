import { postLike } from "../../api/likes/postLike";
import { QueryClient } from "@tanstack/react-query";

export function addLike(
    postId: number, 
    email: string | null, 
    username: string | null, 
    queryClient: QueryClient // Pass queryClient as an argument
) {
    const mutation = () => postLike({ postId, email, username });

    mutation()
        .then(() => {
            queryClient.invalidateQueries({ queryKey: ["likes", postId] });
        })
        .catch((err) => {
            console.error("Error submitting post data:", err);
            return err;
        });
}
