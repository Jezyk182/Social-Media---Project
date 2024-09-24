import axios from "axios";

interface props {
    email: string | null;
    username: string | null;
}

export const fetchUserPosts = async ({ email, username }: props) => {
    return await axios
    .get(`/api/userPosts`, {
        params: { email, username }
    })
    .then( res => {
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