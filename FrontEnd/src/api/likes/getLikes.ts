import axios from "axios";

interface props {
    id: number;
    username: string | null;
    email: string | null;
}


export function fetchLikes({id, username, email}: props) {
    console.log("Fetching likes...");
    return axios
    .get(`/api/posts/likes/get/${ id }`, {
        params: { 
            email,
            username,
        }}
    )
    .then(res => {
        console.log("Likes response: ", res.data);
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