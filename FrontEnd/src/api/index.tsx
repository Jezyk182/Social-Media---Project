import axios from "axios";

export async function fetchPosts() {
    const response = await axios.get("http://localhost:3000/api/")
    return response.data
}