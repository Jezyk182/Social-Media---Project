import axios from "axios";

export function fetchPosts() {
    console.log("Fetching posts...");
    return axios
    .get("http://localhost:3000/api")
    .then(res => {
        console.log("Posts response:", res.data);
        return res.data;
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
        throw error;
    });
}