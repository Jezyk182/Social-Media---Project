import axios from "axios"


export const editPost = async ( id: number, email: string | null, username: string | null, content: string ) => {
    return await axios
    .patch(`/api/posts/edit/${id}`, {
        data: { id, email, username, content }
    })
    .then( res => {
        console.log(`Edited post with ID ${id} to: ${content}`)
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