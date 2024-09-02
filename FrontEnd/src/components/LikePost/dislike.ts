import { deleteLike } from "../../api/likes/deleteLike";
import { QueryClient } from "@tanstack/react-query";

export function dislike(
    postId: number, 
    email: string | null, 
    username: string | null, 
    queryClient: QueryClient // Pass queryClient as an argument
) {
    const mutation = () => deleteLike({ postId, email, username });

    mutation()
        .then(() => {
            queryClient.invalidateQueries({ queryKey: ["likes", postId] });
        })
        .catch((err) => {
            console.error("Error submitting post data:", err);
            return err;
        });
}
