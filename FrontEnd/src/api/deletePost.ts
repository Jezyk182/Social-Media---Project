import axios from "axios";

export const deletePost = async (id: number, email: string | null, username: string | null) => {
    return await axios
    .delete(`/api/posts/delete/${id}`, {
        data: { email, username }
    })
    .then( res => {
        console.log(`Deleted post with ID ${id}`)
        return res.data
    })
    .catch(err => {
        if (err.response) {
            console.error("Error response:", err.response.data);
            console.error("Status:", err.response.status);
            console.error("Headers:", err.response.headers);
        } else if (err.request) {
            console.error("Error request:", err.request);
        } else {
            console.error("General error message:", err.message);
        }
        throw err;
    })
         
}