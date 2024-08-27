import axios from "axios";

export function editPost() {
    console.log("Editing Post...");
    return axios
    .patch("/api/posts/edit/:id")
    .then(res => {
        // console.log("Posts response:", res.data);
        return res.data;
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
        throw error;
    });
}