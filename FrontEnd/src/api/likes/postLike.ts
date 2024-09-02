import axios from "axios";

interface props {
    postId: number;
    username: string | null;
    email: string | null;
}

export function postLike({postId, username, email}: props) {
    console.log("Adding Like...");
    return axios
    .post(`/api/likes/post/${ postId }`, {
        data: { 
            username,
            email,
        }}
    )
    .then(res => {
        console.log("Addin Like response: ", res.data);
        return res.data;
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