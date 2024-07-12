import axios from "axios";

export function fetchPosts() {
    console.log("Fetching posts...");
    return axios
    .get("/api/posts")
    .then(res => {
        // console.log("Posts response:", res.data);
        return res.data;
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
        throw error;
    });
}