import axios from "axios"


export const editUserInfo = async ( email: string | null, username: string | null, bio: string | null, pfp_nr: number ) => {
    return await axios
    .patch(`/api/user/update`, {
        email,
        username,
        bio,
        pfp_nr,
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